import React, { Component } from 'react'
import { Button, Table, Tag } from 'antd'
import Header from 'components/Header'
import { RangePicker } from 'components/DatePicker'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import bill from 'hoc/bill'

const ButtonGroup = Button.Group

@inject(stores => ({ store: stores.sales }))
@bill
@observer
export default class extends Component {
	store = this.props.store
	componentDidMount() {
		this.store.init()
	}

	render() {
		const { ExportGroup, RangePicker, MainTable } = this.props.part
		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ExportGroup style={{ marginLeft: -20 }} withDetail />
						<RangePicker />
					</HandleArea>
					<MainTable className="two-row" title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
