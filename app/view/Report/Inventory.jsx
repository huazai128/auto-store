import React, { Component } from 'react'
import { Button, Table, Tag } from 'antd'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import bill from 'hoc/bill'
import moment from 'moment'

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
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ExportGroup style={{ marginLeft: -20 }} />
						<DatePicker value={this.store.query.time} allowClear={false} />
					</HandleArea>
					<MainTable className="two-row" title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
