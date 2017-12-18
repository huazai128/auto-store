import React, { Component } from 'react';
import { Button } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';

const ButtonGroup = Button.Group;

@inject('prurchase')
@observer
export default class extends Component {
	store = this.props.prurchase
	componentDidMount() {
		this.store.init();
	}

	render() {
		const { HandleButton } = this.store;

		return (
			<Container>
				<Header store={this.store} btn={{ to: '/purchase/create', text: '采购制单' }}>{this.props.name}</Header>
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
						<HandleButton
							method="delete"
							state="created"
							className="ml20"
							type="danger"
							confirm
						>删除
						</HandleButton>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<div className="flex-vcenter ml50">
							查询日期：<this.store.RenderRangePicker />
						</div>
					</HandleArea>
					<this.store.RenderMainTable title={this.props.name} />
				</Content>
			</Container>
		);
	}
}
