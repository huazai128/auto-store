import React, { Component } from 'react'
import { Button, Table } from 'antd'
import Header from 'components/Header'
import ColligatePopoverProduct from 'components/Select/ColligatePopover-Product'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import bill from 'hoc/bill'

const ButtonGroup = Button.Group

@inject(stores => ({ store: stores.reportInventory }))
@bill
@observer
export default class extends Component {
	store = this.props.store
	componentDidMount() {
		this.store.init()
	}

	render() {
		const { ExportGroup, DatePicker, MainTable } = this.props.part

		return (
			<Container>
				<Header noSearch store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ExportGroup style={{ marginLeft: -20 }} />
						<DatePicker value={this.store.query.time} allowClear={false} />
						<ColligatePopoverProduct store={this.store} />
					</HandleArea>
					<MainTable className="two-row" title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
