import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { stateFilters } from 'mapStore/filter'
import TablePrototype from './TablePrototype'

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/refunds'
		this.detailPathname = '/return'

		this.getData = this.getData.bind(this, { url: this.url })
		this.handle = this.handle.bind(this, { url: this.url })
		this.create = this.create.bind(this, { url: this.url })
		this.update = this.update.bind(this, { url: this.url })
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
			hidePrice: true,
			subColumns: [
				{ title: '货品编号', key: 'skuNumber' },
				{ title: '货品名称', key: 'skuName' },
				{ title: '采购价', key: 'costPrice' },
				{ title: '退厂数量', key: 'amount' },
				{ title: '采购价总额', key: 'totalCostPrice' },
				// { title: '备注', key: 'note' },
			]
		},
		{ fix: true, width: 200, mark: '供应商编号及名称', key: 'supplier', },
		{ fix: true, width: 200, mark: '发货地编号及名称', key: 'fromWarehouse', },
		{ fix: true, width: 100, mark: '退厂数量', key: 'amount', },
		{ width: 100, mark: '采购价总额', key: 'totalCostPrice' },
		{ width: 150, mark: '备注', key: 'note', },
		{ width: 100, mark: '制单人', key: 'createdBy', },
		{ width: 80, mark: '制单日期', key: 'createdDate' },
		{ width: 100, mark: '审核人', key: 'checkedBy', },
		{ width: 80, mark: '审核日期', key: 'checkedDate' },
		{ width: 100, mark: '登账人', key: 'confirmedBy', },
		{ width: 80, mark: '登账日期', key: 'confirmedDate' },
	];

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
