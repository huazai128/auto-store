import React, { Component } from 'react'
import { Button, Table, Tag } from 'antd'
import Header from 'components/Header'
import { RangePicker } from 'components/DatePicker'
import { Container, Content, HandleArea, TableMain } from 'components/Layout'
import { observer, inject } from 'mobx-react'
const ButtonGroup = Button.Group


@inject('sales')
@observer
export default class extends Component {
	store = this.props.sales

	componentDidMount() {
		this.store.init()
	}

	render() {
		return (
			<Container>
				<Header noSearch store={this.store}>{this.props.name}</Header>
				<Content>
					{/* <HandleArea className="flex">
						<this.store.RenderRangePicker />
					</HandleArea>
					<this.store.RenderMainTable className="two-row" title={this.props.name} /> */}
				</Content>
			</Container>
		)
	}
}
