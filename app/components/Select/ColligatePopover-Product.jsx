import React, { Component } from 'react'
import ColligatePopover from './ColligatePopover'
import { Icon, Button } from 'antd'
import { observer } from 'mobx-react'
import styles from './style.less'

@observer
export default class extends Component {
	render() {
		const { store } = this.props
		// if (this.props.type) {
		// 	/* eslint-disable */
		// 	switch (this.props.type) {
		// 		case 'sku':
		// 			selectedRowKeys = store.query.skuIds;
		// 			onChange = store.onChangeSku;
		// 			title = '货品选择'
		// 			api = '/api/skus/search'
		// 			break;
		// 		case 'warehouse':
		// 			selectedRowKeys = store.query.warehouseIds;
		// 			onChange = store.onChangeWarehouse;
		// 			title = '仓库选择';
		// 			api = '/api/warehouses/search'
		// 			break;
		// 		/* eslint-enable */
		// 	}
		// }

		const isNull = store.query.skuIds.length === 0

		return (
			<ColligatePopover
				title="选择货品"
				dataType="proData"
				selectedRowKeys={store.query.skuIds}
				onChange={store.onChangeSku}>
				{/* <div className={selectedRowKeys && selectedRowKeys.length > 0 ? styles.filter : ''} style={{ cursor: 'pointer' }}>
					<Icon type="filter" />
				</div> */}
				<Button className="ml20" icon="filter" ghost={isNull} type="primary">货品选择</Button>
			</ColligatePopover>
		)
	}
}
