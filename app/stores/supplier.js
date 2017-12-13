import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Input, Select } from 'antd';
import TablePrototype from './TablePrototype';

import { get, post } from 'utils';
import { skuStateFilters } from 'mapStore/filter';
import axios from 'axios';

const { TextArea } = Input;
const Option = Select.Option;

useStrict(true);
class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/suppliers';

		this.handle = this.handle.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.update = this.update.bind(this, { url: this.url });
	}

	@observable query = {
		query: '',
		end: null,
		start: null,
	};

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

				created_no: '该供应商在系统内生效，但是还没有单据产生,可修改供应商基本信息（除了编号，名称）,也可进行删除！',
				created: '该供应商为合作中,且有单据产生。可修改代理商基本信息（除了编号，名称）！',
				freeze: '不可编辑删除，只可取消冻结！'
			},
			...skuStateFilters
		},
		{ width: 100, mark: '供应商名称', key: 'name', created: { edit: true, rules: { required: true, }, }, },
		{ width: 150, mark: '供应商编号', key: 'number', created: { edit: true, rules: { required: true, }, }, },
		{ width: 100, mark: '联系人', key: 'contact', created: { edit: true, }, },
		{ width: 100, mark: '联系电话', key: 'mobile', created: { edit: true, }, },
		{ width: 100, mark: '地址', key: 'address', created: { edit: true, }, },
		{ width: 100, mark: '传真号', key: 'fax', created: { edit: true, }, },
		{ width: 80, mark: '邮箱地址', key: 'email', created: { rules: { type: 'email' }, edit: true, }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: { edit: true, node: <TextArea rows={4} /> },
		},
	];

	@action getData = async (otherData) => {
		this.query = { ...this.query, ...otherData };

		this.tableLoading = true;

		const [{ data }, { data: count }] = await Promise.all([get(this.url, this.query), get(`${this.url}/count`, this.query)]);
		runInAction(() => {
			data.forEach(i => i.key = i.id);
			this.data = data;
			this.count = count;
			this.tableLoading = false;
		});
	}

	@action handleSelection = (selectedRows) => this.selectedRows = selectedRows;

	@computed get dataSource() { return toJS(this.data); }
	@computed get fields() { return this.getFields(this.columns); }
}

const store = new Store();

export default store;
