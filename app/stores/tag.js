import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import TablePrototype from './TablePrototype';

useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/attrs';

		this.getData = this.getData.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.handle = this.handle.bind(this, { url: this.url });

		this.getData();
	}

	@observable query = {
		query: '',
		size: 999,
	};

	@observable tableLoading = false

	@observable allData = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ width: 200, title: '姓名', key: 'name', },
		{ width: 200, title: '调整属性展示顺序', key: 'ddfs', render: () => 123 },
		{ width: 400, title: '操作', key: 'action', render: () => '操作' },
	];

	@computed get dataSource() { return toJS(this.data); }
	@computed get cascaderData() {
		return this.data.map(item => ({
			value: item.id,
			label: item.name,
			children: item.items.map(i => ({
				value: i.id,
				label: i.name,
			}))
		}));
	}
}

const store = new Store();

export default store;
