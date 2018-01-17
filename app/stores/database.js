import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils/request';
import { Select } from 'antd';

import tag from './tag';

const { Option } = Select;

useStrict(true);
class Store {
	@observable returnTypesSource = []
	@observable supplierSearch = []
	@action getDataSource = async (type, url, query = {}) => {
		const { data } = await get(url, query);
		runInAction(() => this[type] = data);
	}

	@action initData = () => {
		// 退厂类型接口
		this.getDataSource('returnTypesSource', '/api/types/returnTypes');
		// 供应商搜索接口
		this.getDataSource('supplierSearch', 'api/suppliers/search', { size: 9999 });
		// 货品属性接口
		tag.getData();
	}

	// 退厂类型 returnTypes: reactNode
	@computed get returnTypesOption() {
		return this.returnTypesSource.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
	}

	// 添加资料的供应商选择
	@computed get supplierOption() {
		return this.supplierSearch.map(item => <Option key={item.id} value={item.id}>{item.number}</Option>);
	}

}

const store = new Store();

export default store;
