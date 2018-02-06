import React, { Component } from 'react'
import ColligatePopover from './ColligatePopover'
import { Icon } from 'antd'
import { observer } from 'mobx-react'
import styles from './style.less'

@observer
export default class extends Component {
	render() {
		const { store } = this.props

		let selectedRowKeys = []
		let onChange = () => { }
		let title = ''
		let api = ''


		if (this.props.type) {
			/* eslint-disable */
			switch (this.props.type) {
				case 'sku':
					selectedRowKeys = store.query.skuIds;
					onChange = store.onChangeSku;
					title = '货品选择'
					api = '/api/skus/search'
					break;
				case 'warehouse':
					selectedRowKeys = store.query.warehouseIds;
					onChange = store.onChangeWarehouse;
					title = '仓库选择';
					api = '/api/warehouses/search'
					break;
				/* eslint-enable */
			}
		}

		return (
			<ColligatePopover
				title={title}
				api={api}
				selectedRowKeys={selectedRowKeys}
				onChange={onChange} >
				<div className={selectedRowKeys && selectedRowKeys.length > 0 ? styles.filter : ''} style={{ cursor: 'pointer' }}>
					<Icon type="filter" />
				</div>
			</ColligatePopover>
		)
	}
}
