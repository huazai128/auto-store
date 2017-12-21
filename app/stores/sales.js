import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { stateFilters } from 'mapStore/filter';
import TablePrototype from './TablePrototype';

useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/sales';

		this.getData = this.getData.bind(this, { url: this.url });
	}

	@observable query = {};

	@observable tableLoading = false
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ fix: true, width: 150, mark: '单号', key: 'sequence', },
		{ fix: true, width: 150, mark: '发货仓库编号及名称', key: 'fromWarehouseIds', },
		{ width: 150, mark: '购买商品数量', key: 'amount', },
		{ width: 100, mark: '实收金额', key: 'price', },
		{ width: 80, mark: '销售日期', key: 'confirmedDate', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data); }
}

const store = new Store();

export default store;
