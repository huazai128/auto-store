import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils/request';
import { Select } from 'antd';
const { Option } = Select;

useStrict(true);
class Store {
	constructor() {
		this.getDataSource('returnTypesSource', '/api/types/returnTypes');
	}

	@observable returnTypesSource = []

	@action getDataSource = async (type, url, query = {}) => {
		const { data } = await get(url, query);
		runInAction(() => this[type] = data);
	}

	// 退厂类型 returnTypes: { label, value}
	@computed get returnTypesOption() {
		return this.returnTypesSource.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
	}

}

const store = new Store();

export default store;
