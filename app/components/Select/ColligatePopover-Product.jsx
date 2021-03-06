import React, { Component } from 'react'
import ColligatePopover from './ColligatePopover'
import { Icon, Button } from 'antd'
import { observer } from 'mobx-react'

@observer
export default class extends Component {
	render() {
		const { store } = this.props
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
