import React, { Component } from 'react'
import { Button } from 'antd'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import bill from 'hoc/bill'
import { Limit } from 'components/Limit'

const ButtonGroup = Button.Group

@inject(stores => ({ store: stores.refunds }))
@bill
@observer
export default class extends Component {
	store = this.props.store
	componentDidMount() {
		this.store.init()
	}

	render() {
		const { HandleButton, ExportGroup, RangePicker, MainTable, DeleteButton } = this.props.part
		return (
			<Container>
				<Header btn={{ to: '/refunds/create', text: '退货单制单', permission: 'PERMISSION_ADD_STORE_REFUND' }} store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ButtonGroup className="mr20">
							<Limit permission="PERMISSION_CHECK_STORE_REFUND"><HandleButton method="check" state="created">审核</HandleButton></Limit>
							<Limit permission="PERMISSION_CONFIRM_STORE_REFUND"><HandleButton method="confirm" state="checked">登账</HandleButton></Limit>
						</ButtonGroup>
						<ButtonGroup>
							<Limit permission="PERMISSION_UNCHECK_STORE_REFUND"><HandleButton method="uncheck" state="checked">反审</HandleButton></Limit>
							<Limit permission="PERMISSION_UNCONFIRM_STORE_REFUND"><HandleButton className="mr20" method="unconfirm" state="confirmed">反登</HandleButton></Limit>
						</ButtonGroup>
						<Limit permission="PERMISSION_DEL_STORE_REFUND"><DeleteButton>删除</DeleteButton></Limit>
						<ExportGroup withDetail />
						<RangePicker />
					</HandleArea>
					<MainTable className="two-row" push={this.props.push} title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
