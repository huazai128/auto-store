import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { Input, Select } from 'antd'
import { get, post, postByParam } from 'utils/request'
import { productStateFilters } from 'mapStore/filter'
import axios from 'axios'
import TagSelect from 'components/Select/TagSelect'
import SupplierSelect from 'components/Select/SupplierSelect'
import TablePrototype from './TablePrototype'

import database from './database'

const { TextArea } = Input
const Option = Select.Option

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/skus'

		this.getData = this.getData.bind(this, { url: this.url })

		this.handleCallback = () => database.getDataSource('proDataSource', '/api/skus/search', { size: 9999 })

		this.handle = this.handle.bind(this, { url: this.url })
		this.create = this.create.bind(this, { url: this.url })
		this.update = this.update.bind(this, { url: this.url })
	}

	@observable query = {};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0
	@observable columns = [
		{
			fix: true,
			templet: false,
			width: 100,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				type: 'product',

				invoked: '货品资料已在系统内生效，且已有数据产生，不可反应用，但可以修改供应商信息及自定义属性内容！',
				invoked_no: '货品资料已在系统内生效，但尚未产生数据，可反应用，也可以修改供应商信息及自定义属性内容！',
				created: '货品资料没有在系统内生效，可修改所有资料内容，也应用和删除！'
			},
			...productStateFilters
		},
		{ fix: true, width: 100, mark: '商品编号', key: 'number', created: { edit: false, rules: { required: true, }, }, },
		{ fix: true, width: 150, mark: '商品名称', key: 'name', created: { edit: true, limit: (record) => record.state !== 'created', rules: { required: true, }, }, },
		{ width: 100, mark: '品牌', key: 'brand', created: { edit: true, limit: (record) => record.state !== 'created', rules: { required: true, }, }, },
		{
			width: 100,
			mark: '品类',
			key: 'bigStyle',
			label: '大/小品类',
			created: {
				key: 'styles',
				edit: true,
				rules: { required: true, },
				getWrap: true,
				limit: (record) => record.state === 'invoked',
				initValue: (record) => ([Number(record.bigStyleId), Number(record.smallStyleId)]),
				confirmAfter: (values) => {
					if (Array.isArray(values.styles)) return {
						...values,
						bigStyleId: values.styles[0],
						smallStyleId: values.styles[1],
					}
				},
				node: <TagSelect />
			},
		},
		{
			width: 100,
			mark: '小品类',
			key: 'smallStyle',
			created: {
				noCreated: true,
				key: 'styles',
				edit: true,
				rules: { required: true, },
				getWrap: true,
				limit: (record) => record.state === 'invoked',
				initValue: (record) => ([Number(record.bigStyleId), Number(record.smallStyleId)]),
				confirmAfter: (values) => {
					if (Array.isArray(values.styles)) return {
						...values,
						bigStyleId: values.styles[0],
						smallStyleId: values.styles[1],
					}
				},
				node: <TagSelect />
			},
		},
		{ width: 100, mark: '规格', key: 'specification', created: { edit: true, limit: (record) => record.state !== 'created', rules: { required: true, }, }, },
		{ width: 80, mark: '采购价', key: 'costPrice', created: { edit: true, limit: (record) => record.state !== 'created', rules: { required: true, }, type: 'number' }, },
		{ width: 80, mark: '零售价', key: 'price', created: { edit: true, limit: (record) => record.state !== 'created', rules: { required: true, }, type: 'number' }, },
		{
			width: 100,
			mark: '供应商编号',
			key: 'supplierNumber',
			created: {
				key: 'supplierId',
				rules: { required: true, },
				edit: true,
				getWrap: true,
				node: <SupplierSelect />
			}
		},
		{ width: 100, templet: false, mark: '供应商名称', key: 'supplierName', },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: {
				edit: true,
				node: <TextArea rows={4} />
			},
		},
		{ width: 80, templet: false, mark: '录入人', key: 'createdBy', },
		{ width: 80, templet: false, mark: '修改人', key: 'modifiedBy', },
		{ width: 100, templet: false, mark: '最后修改日期', key: 'modifiedDate' },
	];

	@computed get dataSource() { return toJS(this.data) }
	@computed get fields() { return this.getFields(this.columns) }
	@computed get commonColumns() {
		return this.columns.filter(item => item.templet !== false).map(item => ({
			key: item.key,
			title: item.mark || item.title,
		}))
	}
}

const store = new Store()

export default store
