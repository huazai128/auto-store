import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { Tag } from 'antd';
import { get, post, postByParam } from 'utils';
import axios from 'axios';
import moment from 'moment';
import { stateFilters } from 'mapStore/filter';

import TablePrototype from './TablePrototype';


useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/agents/hq/orders';

		this.getData = this.getData.bind(this, { url: this.url });
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
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ width: 100, title: '单据状态', key: 'state', type: 'state', ...stateFilters },
		{ width: 150, title: '单号', key: 'sequence', },
		{ width: 150, title: '收货仓店编号及名称', key: 'toWarehouseName', },
		{ width: 150, title: '供应商编号及名称', key: 'supplierName', },
		{ width: 100, title: '采购数量', key: 'amount', },
		{ width: 150, title: '备注', key: 'note', },
		{ width: 100, title: '制单人', key: 'createdBy', },
		{ width: 80, title: '制单日期', key: 'createdDate', type: 'date' },
		{ width: 100, title: '审核人', key: 'checkedBy', },
		{ width: 80, title: '审核日期', key: 'checkedDate', type: 'date' },
		{ width: 100, title: '登账人', key: 'confirmedBy', },
		{ width: 80, title: '登账日期', key: 'confirmedDate', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data); }
}

const store = new Store();

export default store;
