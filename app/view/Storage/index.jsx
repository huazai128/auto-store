import React, { Component } from 'react'
import { Button } from 'antd'
import Header from 'components/Header'
import { Container, Content, HandleArea } from 'components/Layout'
import { observer, inject } from 'mobx-react'
const ButtonGroup = Button.Group

@inject('storage')
@observer
export default class extends Component {
	store = this.props.storage
	componentDidMount() {
		this.store.init()
	}

	render() {
		const { HandleButton, DeleteButton } = this.store

		return (
			<Container>
				<Header btn={{ to: '/storage/create', text: '入库制单' }} store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ButtonGroup className="mr20">
							<HandleButton method="check" state="created">审核</HandleButton>
							<HandleButton method="confirm" state="checked">登账</HandleButton>
						</ButtonGroup>
						<ButtonGroup>
							<HandleButton method="uncheck" state="checked">反审</HandleButton>
							<HandleButton method="unconfirm" state="confirmed">反登</HandleButton>
						</ButtonGroup>
						<DeleteButton>删除</DeleteButton>
						<this.store.ExportGroup withDetail />
						<this.store.RenderRangePicker />
					</HandleArea>
					<this.store.RenderMainTable className="two-row" push={this.props.push} title={this.props.name} />
				</Content>
			</Container>
		)
	}
}
