import React, { Component } from 'react'
import { Button } from 'antd'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import bill from 'hoc/bill'
import { Limit } from 'components/Limit'

const ButtonGroup = Button.Group

@inject(stores => ({ store: stores.purchase }))
@bill
@observer
export default class extends Component {
	store = this.props.store

	componentWillMount() {
		this.store.init()
	}

	render() {
		const { DeleteButton, HandleButton, ExportGroup, RangePicker, MainTable } = this.props.part

		return (
			<Container>
				<Header store={this.store} btn={{ to: '/purchase/create', text: '采购制单', permission: 'PERMISSION_ADD_PURCHASE' }}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ButtonGroup className="mr20">
							<Limit permission="PERMISSION_CHECK_PURCHASE"><HandleButton method="check" state="created">审核</HandleButton></Limit>
							<Limit permission="PERMISSION_CONFIRM_PURCHASE"><HandleButton method="confirm" state="checked">登账</HandleButton></Limit>
						</ButtonGroup>
						<ButtonGroup>
							<Limit permission="PERMISSION_UNCHECK_PURCHASE"><HandleButton method="uncheck" state="checked">反审</HandleButton></Limit>
							<Limit permission="PERMISSION_UNCONFIRM_PURCHASE"><HandleButton method="unconfirm" state="confirmed">反登</HandleButton></Limit>
						</ButtonGroup>
						<Limit permission="PERMISSION_DEL_PURCHASE"><DeleteButton>删除</DeleteButton></Limit>
						<ExportGroup withDetail />
						<RangePicker />
					</HandleArea>
					<MainTable className="two-row" push={this.props.push} title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
