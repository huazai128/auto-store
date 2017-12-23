import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Input, Select, DatePicker } from 'antd';
import TablePrototype from './TablePrototype';
import { get, post } from 'utils/request';
import { dataStateFilters } from 'mapStore/filter';
import axios from 'axios';
const { TextArea } = Input;

useStrict(true);
class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/stores';

		this.getData = this.getData.bind(this, { url: this.url });
		this.handle = this.handle.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.update = this.update.bind(this, { url: this.url });
	}

	@observable query = {
		query: '',
	};

	@observable data = []
	@observable count = 0
	@observable tableLoading = true
	@observable selectedRows = []

	@observable columns = [
		{
			fix: true,
			width: 80,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				type: 'store',

				created_no: '该门店在系统内生效，但是还没有单据产生,可修改门店基本信息（除了编号，名称）,也可进行删除！',
				created: '该门店为合作中,且有单据产生。可修改代理商基本信息（除了编号，名称）！',
				freeze: '不可编辑删除，只可取消冻结！'
			},
			...dataStateFilters
		},
		{ fix: true, width: 100, mark: '门店名称', key: 'name', created: { rules: { required: true, }, }, },
		{ fix: true, width: 150, mark: '门店编号', key: 'number', created: { rules: { required: true, }, }, },
		{ width: 100, mark: '门店面积', key: 'area', created: { edit: true, }, },
		{ width: 100, mark: '开业时间', key: 'openDate', type: 'date', created: { node: <DatePicker /> }, },
		{ width: 100, mark: '门店地址', key: 'address', created: { edit: true, }, },
		{ width: 100, mark: '联系人', key: 'contact', created: { edit: true, }, },
		{ width: 80, mark: '联系方式', key: 'contactWay', created: { edit: true, }, },
		{ width: 100, mark: '运营联系人', key: 'operationContact', created: { edit: true, }, },
		{ width: 100, mark: '运营联系方式', key: 'operationContactWay', created: { edit: true, }, },
		{ width: 100, mark: '物业联系人', key: 'propertyContact', created: { edit: true, }, },
		{ width: 100, mark: '物业联系方式', key: 'propertyContactWay', created: { edit: true, }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: { edit: true, node: <TextArea rows={4} /> },
		},
	];

	@computed get dataSource() { return toJS(this.data); }
	@computed get fields() { return this.getFields(this.columns); }
}

const store = new Store();

export default store;
