import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import TablePrototype from './TablePrototype'
import moment from 'moment'

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/invoicings'

		this.getData = this.getData.bind(this, { url: this.url })
	}

	@observable query = {
		warehouseIds: [],
		skuIds: [],
		start: moment().startOf('month'),
		end: moment().startOf('day')
	};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ fix: true, width: 200, mark: '仓库编号及名称', key: 'warehouse', },
		{ fix: true, width: 100, mark: '货品编号', key: 'skuNumber', },
		{ fix: true, width: 100, mark: '货品名称', key: 'skuName', },
		{ width: 100, mark: '库存数量', key: 'inventory', },

		{ width: 100, mark: '入库数', key: 'stockin', },
		{ width: 100, mark: '仓店收货数', key: 'receiving', },

		{ width: 100, mark: '在途', key: 'onPassage', },

		{ width: 100, mark: '发货数', key: 'sending', },
		{ width: 100, mark: '销售数', key: 'sale', },
		{ width: 100, mark: '退厂数', key: 'refund', },
		{ width: 100, mark: '退货数', key: 'storeRefund', },
	];

	@action getDefaultWarehouseIds = (warehouseIds) => {
		this.query.warehouseIds = warehouseIds
	}

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
