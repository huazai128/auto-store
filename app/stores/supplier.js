import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Input, Select } from 'antd';

import { getApi, postApi } from 'utils/axios';
import { skuStateFilters } from 'mapStore/filter';

const { TextArea } = Input;
const Option = Select.Option;

useStrict(true);
class Store {
	@observable data = []
	@observable count = 0
	@observable tableLoading = true
	@observable columns = [
		{
			width: 80,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				created: '该供应商在系统内生效，但是还没有单据产生,可修改供应商基本信息（除了编号，名称）,也可进行删除！',
				cooperation: '该供应商为合作中,且有单据产生。可修改代理商基本信息（除了编号，名称）！',
				freeze: '不可编辑删除，只可取消冻结！'
			},
			...skuStateFilters
		},
		{ width: 100, mark: '供应商名称', key: 'name', created: { edit: false, rules: true, }, },
		{ width: 150, mark: '供应商编号', key: 'number', created: { edit: false, rules: true, }, },
		{ width: 100, mark: '联系人', key: 'contact', created: { edit: false, }, },
		{ width: 100, mark: '联系电话', key: 'mobile', created: { edit: false, }, },
		{ width: 100, mark: '地址', key: 'address', created: { edit: false, }, },
		{ width: 100, mark: '传真号', key: 'fax', created: { edit: false, }, },
		{ width: 80, mark: '邮箱地址', key: 'email', created: { edit: false, }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: { edit: false, node: <TextArea rows={4} /> },
		},
	];

	@action getData = async () => {
		this.tableLoading = true;
		const [{ data }, { data: count }] = await Promise.all([getApi('/api/suppliers'), getApi('/api/suppliers/count')]);
		runInAction(() => {
			data.forEach(i => i.key = i.id);
			this.data = data;
			this.count = count;
			this.tableLoading = false;
		});
	}

	@action createSupplier = async (query) => {
		const { data } = await postApi('/api/suppliers/create', query);
		runInAction(this.getData);
		return;
	}


	@computed get dataSource() { return toJS(this.data); }

	@computed get fields() {
		return this.columns
			.filter(i => i.created)
			.map(item => ({
				label: item.mark,
				key: item.key,
				...item.created
			}));
	}
}

const store = new Store();

export default store;
