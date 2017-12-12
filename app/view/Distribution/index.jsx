import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { RangePicker } from 'components/DatePicker';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';
import { stateFilters } from 'mapStore/filter';
const ButtonGroup = Button.Group;

@observer
export default class extends Component {

	render() {
		const dataSource = [{
			key: '1',
			name: '胡彦斌',
			age: 32,
			address: '西湖区湖底公园1号',
			time: new Date().valueOf()
		}, {
			key: '2',
			name: '胡彦祖',
			age: 42,
			address: '西湖区湖底公园1号',
			time: new Date().valueOf()
		}];

		const columns = [
			{ width:100, title: '状态', key: 'name', render: () => <Tag>未应用</Tag>, ...stateFilters },
			{ width:800, title: '商品编号',  key: 'time', },
		];

		return (
			<Container>
				<Header btn={{ to: '/purchase/create', text: '多店铺配货' }}>{this.props.name}</Header>
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
						<Button className="ml20" icon="notification" type="primary" ghost>通知发货</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<div className="flex-vcenter ml50">
							查询日期：
							<RangePicker />
						</div>
					</HandleArea>
					<TableMain
						dataSource={dataSource}
						title={this.props.name}
						columns={columns} />
				</Content>
			</Container>
		);
	}
}
