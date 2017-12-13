import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { RangePicker } from 'components/DatePicker';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';
import { stateFilters } from 'mapStore/filter';
const ButtonGroup = Button.Group;

@inject('prurchase')
@observer
export default class extends Component {
	store = this.props.prurchase

	render() {
		const { store } = this;
		const { RenderRangePicker } = store;

		return (
			<Container>
				<Header btn={{ to: '/purchase/create', text: '采购制单' }}>{this.props.name}</Header>
				<Content>
					<HandleArea className="flex">
						<ButtonGroup className="mr20">
							<Button type="primary" ghost>审核</Button>
							<Button type="primary" ghost>登账</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button type="primary" ghost>反审</Button>
							<Button type="primary" ghost>反登</Button>
						</ButtonGroup>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<div className="flex-vcenter ml50">
							查询日期：<store.RenderRangePicker />
						</div>
					</HandleArea>
					<TableMain
						dataSource={this.store.dataSource}
						title={this.props.name}
						columns={this.store.columns} />
				</Content>
			</Container>
		);
	}
}
