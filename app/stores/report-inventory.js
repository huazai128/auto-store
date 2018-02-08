import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import TablePrototype from './TablePrototype'
import moment from 'moment'

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/inventory/report'

		this.getData = this.getData.bind(this, { url: this.url })
	}

	@observable query = {
		warehouseIds: [1],
		skuIds: [24, 22],
		time: moment(),
	};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ width: 100, mark: '货品编号', key: 'skuNumber', },
		{ width: 100, mark: '货品名称', key: 'skuName', },
		{ width: 100, mark: '品牌', key: 'brand', },
		{ width: 100, mark: '大类', key: 'bigStyle', },
		{ width: 100, mark: '小类', key: 'smallStyle', },
		{ width: 100, mark: '规格', key: 'specification', },
		{ width: 100, mark: '单款采购价', key: 'costPrice', },
		{ width: 100, mark: '单款零售价', key: 'price', },
		{ fix: true, width: 150, mark: '仓库编号及名称', key: 'warehouse', },
		{ width: 100, mark: '库存数量', key: 'amount', },
		{ width: 100, mark: '总库存数量', key: 'totalAmount', },
		{ width: 100, mark: '采购价总额', key: 'totalCostPrice', },
		{ width: 100, mark: '零售价总额', key: 'totalPrice', },

	];

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
