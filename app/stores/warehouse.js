import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { Input, Select, DatePicker } from 'antd'
import TablePrototype from './TablePrototype'

import { get, post } from 'utils/request'
import { skuStateFilters } from 'mapStore/filter'
import axios from 'axios'
const { TextArea } = Input

useStrict(true)
class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/warehouses'

		this.getData = this.getData.bind(this, { url: this.url })
		this.handle = this.handle.bind(this, { url: this.url })
		this.create = this.create.bind(this, { url: this.url })
		this.update = this.update.bind(this, { url: this.url })
	}

	@observable query = {};

	@observable data = []
	@observable count = 0
	@observable tableLoading = true
	@observable selectedRows = []

	@observable columns = [
		{
			width: 80,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				type: 'store',

				created_no: '该仓库在系统内生效，但是还没有单据产生,可修改仓库基本信息（除了编号，名称）,也可进行删除！',
				created: '该仓库为合作中,且有单据产生。可修改代理商基本信息（除了编号，名称）！',
				freeze: '不可编辑删除，只可取消冻结！'
			},
			...skuStateFilters
		},
		{ width: 100, mark: '仓库名称', key: 'name', created: { edit: true, rules: { required: true, }, }, },
		{ width: 150, mark: '仓库编号', key: 'number', created: { edit: true, rules: { required: true, }, }, },
		{ width: 100, mark: '仓库面积', key: 'area', created: { edit: true, }, },
		{ width: 100, mark: '开业时间', key: 'openDate', created: { edit: true, node: <DatePicker /> }, },
		{ width: 100, mark: '仓库地址', key: 'address', created: { edit: true, }, },
		{ width: 100, mark: '联系人', key: 'contact', created: { edit: true, }, },
		{ width: 80, mark: '联系方式', key: 'contactWay', created: { edit: true, }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: { edit: true, node: <TextArea rows={4} /> },
		},
	];

	@computed get dataSource() { return toJS(this.data) }
	@computed get fields() { return this.getFields(this.columns) }
}

const store = new Store()

export default store
