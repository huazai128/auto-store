import React, { Component } from 'react';
import SupplierPopover from './supplier-popover';
import { observer } from 'mobx-react';

@observer
export default class extends Component {
	render() {
		const { store } = this.props;

		return (
			<SupplierPopover title="供应商查询" selectedRowKeys={store.query.supplierids} onChange={store.onChangeSupplier} >{this.props.children}</SupplierPopover>
		);
	}
}
