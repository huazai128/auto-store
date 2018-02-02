import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import TablePrototype from './TablePrototype'

useStrict(true)

class Store extends TablePrototype {
	constructor() {
		super()
		this.url = '/api/order'

		this.getData = this.getData.bind(this, { url: this.url })
	}

	@observable query = {};

	@observable tableLoading = false
	@observable selectedRows = []
	@observable data = []
	@observable count = 0

	@observable columns = [
		{ fix: true, width: 150, mark: '单号', key: 'sequence', },
		{
			width: 50,
			mark: '明细',
			key: 'view',
			hideCollect: true,
			subColumns: [
				{ title: '货品编号', key: 'number' },
				{ title: '货品名称', key: 'name' },
				{ title: '零售价', key: 'price' },
				{ title: '销售数量', key: 'amount' },
				{ title: '零售价总额', key: 'totalPrice' },
			]
		},
		{ width: 150, mark: '店铺编号及名称', key: 'store', },
		{ width: 150, mark: '销售总数量', key: 'amount', },
		{ width: 100, mark: '实收总金额', key: 'totalPrice', },
		{ width: 400, mark: '销售日期', key: 'createdDate', type: 'date' },
	];

	@computed get dataSource() { return toJS(this.data) }
}

const store = new Store()

export default store
