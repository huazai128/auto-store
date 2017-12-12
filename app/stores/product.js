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
	@observable tableLoading = false
	@observable columns = [
		{
			width: 100,
			mark: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				confirmed: '货品资料已在系统内生效，且已有数据产生，不可反应用，但可以修改供应商信息及自定义属性内容！',
				checked: '货品资料已在系统内生效，但尚未产生数据，可以修改供应商信息及自定义属性内容！',
				pending: '货品资料没有在系统内生效，可修改所有资料内容，也可进行删除！'
			},
			...skuStateFilters
		},
		{ width: 100, mark: '商品编号', key: 'number', created: { edit: false, rules: true, }, },
		{ width: 150, mark: '商品名称', key: 'name', created: { edit: true, rules: true, }, },
		{ width: 100, mark: '品牌', key: 'd', created: { edit: true, rules: true, }, },
		{ width: 100, mark: '大品类', key: 'e', created: { edit: true, rules: true, }, },
		{ width: 100, mark: '小品类', key: 'f', created: { edit: true, rules: true, }, },
		{ width: 100, mark: '规格', key: 'g', created: { edit: true, rules: true, }, },
		{ width: 80, mark: '采购价', key: 'costPrice', created: { edit: true, rules: true, type: 'number' }, },
		{ width: 80, mark: '结算价', key: 'price', created: { edit: true, rules: true, type: 'number' }, },
		{
			width: 100,
			mark: '备注',
			key: 'note',
			created: {
				edit: true,
				rules: false,
				node: <TextArea rows={4} />
			},
		},
		{
			width: 100,
			mark: '供应商编号',
			key: 'supplierNumber',
			created: {
				edit: true,
				getWrap: true,
				node: (
					<Select>
						<Option value="rmb">RMB</Option>
						<Option value="dollar">Dollar</Option>
					</Select>
				)
			}
		},
		{ width: 100, mark: '供应商名称', key: 'supplierName', },
		{ width: 80, mark: '录入人', key: 'createdBy', },
		{ width: 80, mark: '修改人', key: 'modifiedBy', },
		{ width: 100, mark: '最后修改日期', key: 'modifiedDate', type: 'date' },
	];

	@action getData = async () => {
		this.tableLoading = true;
		const [{ data }, { data: count }] = await Promise.all([getApi('/api/skus'), getApi('/api/skus/count')]);
		runInAction(() => {
			data.forEach(i => i.key = i.id);
			this.data = data;
			this.count = count;
			this.tableLoading = false;
		});
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
