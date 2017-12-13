import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Tag } from 'antd';
import { get, post, postByParam } from 'utils';
import axios from 'axios';
import moment from 'moment';
import TablePrototype from './TablePrototype';


useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/prurchase';

		this.handle = this.handle.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.update = this.update.bind(this, { url: this.url });
	}

	@observable query = {
		query: '',
		end: undefined,
		start: undefined,
	};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = [{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号',
		time: new Date().valueOf()
	}, {
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号',
		time: new Date().valueOf()
	}]
	@observable count = 0

	@observable columns = [
		{ width: 100, title: '单据状态', key: 'name', render: () => <Tag>未应用</Tag> },
		{ width: 150, title: '单号', key: 'b', },
		{ width: 150, title: '收货仓店编号及名称', key: 'c', },
		{ width: 150, title: '供应商编号及名称', key: 'd', },
		{ width: 100, title: '采购数量', key: 'e', },
		{ width: 100, title: '备注', key: 'note', },
		{ width: 100, title: '制单人', key: 'f', },
		{ width: 80, title: '制单日期', key: 'g', type: 'date' },
		{ width: 100, title: '审核人', key: 'aa', },
		{ width: 80, title: '审核日期', key: 'bb', type: 'date' },
		{ width: 100, title: '登账人', key: 'cc', },
		{ width: 80, title: '登账日期', key: 'dd', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data); }
}

const store = new Store();

export default store;
