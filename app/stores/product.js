import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Input, Select } from 'antd';

import { get, post, postByParam } from 'utils';
import { skuStateFilters } from 'mapStore/filter';
import axios from 'axios';

import TablePrototype from './TablePrototype';

const { TextArea } = Input;
const Option = Select.Option;

useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/skus';

		this.handle = this.handle.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.update = this.update.bind(this, { url: this.url });
	}

	@observable query = {
		query: '',
	};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0
	@observable columns = [
		{
			width: 100,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				type: 'product',

				invoke: '货品资料已在系统内生效，且已有数据产生，不可反应用，但可以修改供应商信息及自定义属性内容！',
				invoke_no: '货品资料已在系统内生效，但尚未产生数据，可以修改供应商信息及自定义属性内容！',
				created: '货品资料没有在系统内生效，可修改所有资料内容，也可进行删除！'
			},
			...skuStateFilters
		},
		{ width: 100, mark: '商品编号', key: 'number', created: { edit: false, rules: { required: true, }, }, },
		{ width: 150, mark: '商品名称', key: 'name', created: { edit: true, rules: { required: true, }, }, },
		{ width: 100, mark: '品牌', key: 'brand', created: { edit: true, rules: { required: true, }, }, },
		{
			width: 100,
			mark: '大品类',
			key: 'bigStyle',
			created: {
				key: 'bigStyleId',
				edit: true,
				rules: { required: true, },
				type: 'number'
			},
		},
		{
			width: 100,
			mark: '小品类',
			key: 'smallStyle',
			created: {
				key: 'smallStyleId',
				edit: true,
				rules: { required: true, },
				type: 'number'
			},
		},
		{ width: 100, mark: '规格', key: 'specification', created: { edit: true, rules: { required: true, }, }, },
		{ width: 80, mark: '采购价', key: 'costPrice', created: { edit: true, rules: { required: true, }, type: 'number' }, },
		{ width: 80, mark: '结算价', key: 'price', created: { edit: true, rules: { required: true, }, type: 'number' }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: {
				edit: true,
				node: <TextArea rows={4} />
			},
		},
		{
			width: 100,
			mark: '供应商编号',
			key: 'supplierNumber',
			created: {
				key: 'supplierId',
				rules: { required: true, },
				edit: true,
				getWrap: true,
				node: (
					<Select>
						<Option value={1}>RMB</Option>
						<Option value={2}>Dollar</Option>
					</Select>
				)
			}
		},
		{ width: 100, mark: '供应商名称', key: 'supplierName', },
		{ width: 80, mark: '录入人', key: 'createdBy', },
		{ width: 80, mark: '修改人', key: 'modifiedBy', },
		{ width: 100, mark: '最后修改日期', key: 'modifiedDate', type: 'date' },
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
			this.selectedRows = [];
		});
	}

	@computed get dataSource() { return toJS(this.data); }
	@computed get fields() { return this.getFields(this.columns); }

}

const store = new Store();

export default store;
