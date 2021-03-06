import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { get, post, postByParam } from 'utils/request'
import axios from 'axios'
import { translateParams, filterBlank } from 'utils'
import { message } from 'antd'

useStrict(true)

export default class {
	constructor() {
		// 不设置checked和fix的时候，默认为true
		this.columns.forEach(column => {
			if (column.checked === undefined && !column.fix) column.checked = true
		})

		this.pageSize = 15
	}

	@action initQuery = () => {
		this.query = {
			size: this.pageSize,
			start: null,
			end: null,
			supplierIds: [],
			warehouseIds: [],
			toWarehouseIds: [],
			fromWarehouseIds: [],
			...this.query,
		}
	}

	@action init = () => {
		// this.data = []
		// console.log(this.data.clear()
		this.data.clear()
		this.initQuery()
		this.getData()
	}

	@action handleSelection = (selectedRows) => {
		this.selectedRows = selectedRows
	}

	// @action onRowClick = (record) => {
	// 	const { key } = record;
	// 	if (this.selectedRows.map(i => i.key).includes(key)) {
	// 		this.selectedRows = this.selectedRows.filter(item => item.key !== key);
	// 	} else {
	// 		this.selectedRows = [...this.selectedRows, record];
	// 	}
	// }

	@action onRowDoubleClick = (record, push) => {
		const { state, id } = record
		if (state !== 'created') return
		if (!this.detailPathname) return

		push(`${this.detailPathname}/${id}`)
	}

	// 单据操作
	@action handle = async ({ url }, type, ids) => {
		await postByParam(`${url}/${type}`, { ids: ids.toString() })
		runInAction(this.getData)
		return
	}

	// 新增
	@action create = async ({ url }, query) => {
		const { data } = await post(`${url}/create`, query)
		runInAction(this.getData)
		return
	}
	// 批量导入
	@action creates = async (data) => {
		try {
			await post(`${this.url}/creates`, data)
			message.success('操作成功~！')
		} catch (error) {
			// message.error(error)
		}
		runInAction(this.getData)
		return
	}

	// 编辑接口
	@action update = async ({ url }, query) => {
		const { id } = query
		delete query.id
		const { data } = await axios.post(`${url}/update`, query, { params: { id } })
		runInAction(this.getData)
		return
	}

	// 选择时间段
	@action handleRangePicker = (dates) => {
		this.query.start = dates[0]
		this.query.end = dates[1]
		this.query.from = 0
		this.getData()
	}

	// 选择时间点 description: 受控属性
	@action handlePicker = (date) => {
		this.query.time = date
		this.query.from = 0
		this.getData()
	}


	// 搜索关键字
	@action handleSearchChange = (value) => {
		this.query.query = filterBlank(value)
		this.query.from = 0
		this.getData()
	}

	@action getData = async ({ url }) => {
		const query = toJS(this.query)

		if ('skuIds' in query && (query.skuIds.length == 0 || query.warehouseIds.length == 0)) {
			this.data = []
			this.count = 0
			return
		}

		translateParams(query)

		this.tableLoading = true
		const [{ data }, { data: count }] = await Promise.all([get(url, query), get(`${url}/count`, query)])
		runInAction(() => {
			data.forEach(i => {
				i.key = i.id || JSON.stringify({ warehouseId: i.warehouseId, skuId: i.skuId })
			})
			this.data = data
			this.count = count
			this.tableLoading = false
			this.selectedRows = []
		})

		this.handleCallback && this.handleCallback()
	}

	@action onChangeTable = (pagination, filters) => {
		const { current, pageSize } = pagination

		if (Array.isArray(filters.state)) this.query.state = filters.state[0]
		this.query.from = (current - 1) * pageSize
		this.getData()
	}

	@action onFilterTableHeader = (checkedList) => {
		this.columns.forEach(item => {
			if (checkedList.includes(item.mark)) item.checked = true
			else item.checked = false
		})
		this.columns = observable.shallowArray(this.columns)
	}

	@action onChangeSupplier = (selectedRowKeys) => {
		this.query.supplierIds = selectedRowKeys
		this.getData()
	}

	@action onChangeWarehouse = (selectedRowKeys) => {
		this.query.warehouseIds = selectedRowKeys
		this.getData()
	}

	@action onChangeToWarehouse = (selectedRowKeys) => {
		this.query.toWarehouseIds = selectedRowKeys
		this.getData()
	}

	@action onChangeFromWarehouse = (selectedRowKeys) => {
		this.query.fromWarehouseIds = selectedRowKeys
		this.getData()
	}

	@action onChangeSku = (selectedRowKeys) => {
		this.query.skuIds = selectedRowKeys
		this.getData()
	}

	getFields = (columns = []) => {
		return columns.filter(i => i.created && !i.created.noCreated).map(item => ({
			label: item.label || item.mark,
			key: item.key,
			...item.created
		}))
	}
}
