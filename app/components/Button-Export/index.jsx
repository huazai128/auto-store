import React, { Component } from 'react'
import { Button } from 'antd'
import { serializeParams } from 'utils'
import { _API_BASE_ } from 'utils/request'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

const ButtonGroup = Button.Group

function serializeColumns(columns) {
	const templets = [
		{
			targetKey: 'warehouseIds',
			transf: [
				{ title: '仓库编号', key: 'warehouseNumber' },
				{ title: '仓库名称', key: 'warehouseName' },
			]
		},
		{
			targetKey: 'toWarehouseIds',
			transf: [
				{ title: '收货仓编号', key: 'toWarehouseNumber' },
				{ title: '收货仓名称', key: 'toWarehouseName' },
			]
		},
		{
			targetKey: 'fromWarehouseIds',
			transf: [
				{ title: '供货仓编号', key: 'fromWarehouseNumber' },
				{ title: '供货仓名称', key: 'fromWarehouseName' },
			]
		},
		{
			targetKey: 'store',
			transf: [
				{ title: '店铺编号', key: 'storeNumber' },
				{ title: '店铺名称', key: 'storeName' },
			]
		},
		{
			targetKey: 'supplierIds',
			transf: [
				{ title: '供应商编号', key: 'supplierNumber' },
				{ title: '供应商名称', key: 'supplierName' },
			]
		}
	]

	templets.forEach(item => {
		const index = columns.map(i => i.key).indexOf(item.targetKey)
		if (index > -1) columns.splice(index, 1, ...item.transf)
	})
}

@inject('user')
@observer
export default class extends Component {
	computeData = (columns) => {
		if (columns.length == 0) return {}

		const columnsJS = toJS(columns)

		const filterColumns = columnsJS
			.filter(item => item.title)
			.filter(item => item.fix || item.checked || !('checked' in item))
			.filter(item => item.key !== 'view')

		const result = {}

		serializeColumns(filterColumns)

		filterColumns.forEach(item => {
			result[item.key] = item.mark || item.title
		})

		return {
			fields: JSON.stringify(result)
		}
	}

	render() {
		const {
			store,
			withDetail,
			disabled = false,
			url,
			data = {},
			...rest } = this.props

		if (store) {
			data.ids = store.selectedRows.map(item => item.id)
		}

		const billColumns = store.columns.find(column => column.key == 'view') ? store.columns.find(column => column.key == 'view').subColumns : []

		const { access_token } = this.props.user
		const { ids = [] } = data

		const exportOtherData = this.computeData(store.columns)
		const exportDetailOtherData = this.computeData(billColumns)

		const BindButton = ({ type, children }) => (
			<a href={
				type !== 'detail'
					? `${_API_BASE_}${url}/export?${serializeParams({ access_token, ...data, ...exportOtherData })}`
					: `${_API_BASE_}${url}/exportItems?${serializeParams({ access_token, ...data, ...exportDetailOtherData })}`
			}>
				<Button
					ghost
					type="primary"
					disabled={disabled || ids && ids.length === 0}
					icon="export"
					style={{ marginLeft: 20 }}
				>
					{children}
				</Button>
			</a>
		)

		return (
			<span {...rest}>
				<BindButton key="ButtonExport1">Excel导出资料</BindButton>
				{withDetail && <BindButton key="ButtonExport2" type="detail">Excel导出单据详情</BindButton>}
			</span>
		)
	}
}
