import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { stateFilters } from 'mapStore/filter'
import TablePrototype from './TablePrototype'

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/stocktakings'
		this.detailPathname = '/stocktakings'

		this.getData = this.getData.bind(this, { url: this.url })
		this.handle = this.handle.bind(this, { url: this.url })
		this.create = this.create.bind(this, { url: this.url })
		this.update = this.update.bind(this, { url: this.url })
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
				{ title: '货品编号', key: 'skuNumbe1r' },
				{ title: '货品名称', key: 'skuName2' },
				{ title: '采购价', key: 'costPri3ce' },
				{ title: '零售价', key: 'price4' },
				{ title: '数量', key: 'amoun5t' },
			]
		},
		{ width: 200, mark: '盘点仓库', key: 'warehouseIds', },
		{ width: 80, mark: '盘点日期', key: 'stocktakingDate', type: 'date' },
		{ width: 100, mark: '盘点范围', key: 'global', render: text => text ? '全局盘点' : '局部盘点'},
		{ width: 100, mark: '实盘数量', key: 'totalAmount', },
		{ width: 100, mark: '实盘成本价', key: 'totalCostPrice', },
		{ width: 100, mark: '实盘销售价', key: 'totalPrice', },
		{ width: 100, mark: '数量差异', key: 'totalAmountDiff', },
		{ width: 100, mark: '成本价差异', key: 'totalCostPriceDiff', },
		{ width: 100, mark: '销售价差异', key: 'totalPriceDiff', },

		{ width: 150, mark: '备注', key: 'note', },
		{ width: 100, mark: '制单人', key: 'createdBy', },
		{ width: 80, mark: '制单日期', key: 'createdDate', type: 'date' },
		{ width: 100, mark: '审核人', key: 'checkedBy', },
		{ width: 80, mark: '审核日期', key: 'checkedDate', type: 'date' },
		{ width: 100, mark: '登账人', key: 'confirmedBy', },
		{ width: 80, mark: '登账日期', key: 'confirmedDate', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
