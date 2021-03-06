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
		warehouseIds: [],
		skuIds: [],
		time: moment(),
	};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ fix: true, width: 200, mark: '仓库编号及名称', key: 'warehouse', },
		{ width: 100, mark: '货品编号', key: 'skuNumber', },
		{ width: 200, mark: '货品名称', key: 'skuName', },
		{ width: 100, mark: '品牌', key: 'brand', },
		{ width: 100, mark: '大类', key: 'bigStyle', },
		{ width: 100, mark: '小类', key: 'smallStyle', },
		{ width: 100, mark: '规格', key: 'specification', },
		{ width: 100, mark: '单款采购价', key: 'costPrice', },
		{ width: 100, mark: '单款零售价', key: 'price', },
		{ width: 100, mark: '当前库存数量', key: 'amount', },
		{ width: 120, mark: '当前可用库存数量', key: 'availableAmount', },
		{ width: 120, mark: '总仓库存数量', key: 'totalAmount', },
		{ width: 120, mark: '总仓可用库存数量', key: 'totalAvailableAmount', },

		{ width: 100, mark: '采购价总额', key: 'totalCostPrice', },
		{ width: 100, mark: '零售价总额', key: 'totalPrice', },
	];

	@action getDefaultWarehouseIds = (warehouseIds) => {
		this.query.warehouseIds = warehouseIds
	}

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
