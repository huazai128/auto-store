import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { stateFilters } from 'mapStore/filter';
import TablePrototype from './TablePrototype';

useStrict(true);

class Store extends TablePrototype {
	constructor() {
		super();
		this.url = 'api/distributions';
		this.detailPathname = '/distributions';

		this.getData = this.getData.bind(this, { url: this.url });
		this.handle = this.handle.bind(this, { url: this.url });
		this.create = this.create.bind(this, { url: this.url });
		this.update = this.update.bind(this, { url: this.url });
	}

	@observable query = {};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ fix: true, width: 100, mark: '单据状态', key: 'state', type: 'state', ...stateFilters },
		{ fix: true, width: 150, mark: '单号', key: 'sequence', },
		{
			width: 50,
			mark: '明细',
			key: 'view',
			subColumns: [
				{ title: '货品编号', key: 'skuNumber' },
				{ title: '货品名称', key: 'skuName' },
				{ title: '采购价', key: 'costPrice' },
				{ title: '零售价', key: 'price' },
				{ title: '数量', key: 'amount' },
				{ title: '采购价总额', key: 'totalCostPrice' },
				{ title: '零售价总额', key: 'totalPrice' },
			]
		},
		{ fix: true, width: 150, mark: '收货仓店编号及名称', key: 'toWarehouseIds', },
		{ fix: true, width: 150, mark: '供货仓店编号及名称', key: 'fromWarehouseIds', },
		{ width: 100, mark: '配货数量', key: 'amount', },
		{ width: 100, mark: '采购价总额', key: 'totalCostPrice' },
		{ width: 100, mark: '零售价总额', key: 'totalPrice' },
		{ width: 150, mark: '备注', key: 'note', },
		{ width: 100, mark: '制单人', key: 'createdBy', },
		{ width: 80, mark: '制单日期', key: 'createdDate', type: 'date' },
		{ width: 100, mark: '审核人', key: 'checkedBy', },
		{ width: 80, mark: '审核日期', key: 'checkedDate', type: 'date' },
		{ width: 100, mark: '登账人', key: 'confirmedBy', },
		{ width: 80, mark: '登账日期', key: 'confirmedDate', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data); }
}

const store = new Store();

export default store;
