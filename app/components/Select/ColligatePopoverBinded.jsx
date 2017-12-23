import React, { Component } from 'react';
import ColligatePopover from './ColligatePopover';
import { Icon } from 'antd';
import { observer } from 'mobx-react';
import styles from './style.less';

@observer
export default class extends Component {
	render() {
		const { store } = this.props;

		let selectedRowKeys = [];
		let onChange = () => { };
		let title = '';
		let api = '';
		let classString = '';

		if (this.props.type) {
			/* eslint-disable */
			switch (this.props.type) {
				case 'supplier':
					selectedRowKeys = store.query.supplierIds;
					onChange = store.onChangeSupplier;
					title = '供应商选择'
					api = 'api/suppliers/search'
					break;
				case 'warehouse':
					selectedRowKeys = store.query.warehouseIds;
					onChange = store.onChangeWarehouse;
					title = '仓店选择';
					api = '/api/warehouses/search'
					break;
				case 'toWarehouse':
					selectedRowKeys = store.query.toWarehouseIds;
					onChange = store.onChangeToWarehouse;
					title = '收货仓店选择';
					api = '/api/warehouses/search'
					break;
				case 'fromWarehouse':
					selectedRowKeys = store.query.fromWarehouseIds;
					onChange = store.onChangeFromWarehouse;
					title = '供货仓店选择';
					api = '/api/warehouses/search'
					break;
				default:
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
		);
	}
}
