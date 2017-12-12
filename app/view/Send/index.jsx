import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { RangePicker } from 'components/DatePicker';
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
			{ width: 100, title: '单据状态', key: 'name', render: () => <Tag>未应用</Tag>, ...stateFilters },
			{ width: 150, title: '单号', key: 'b', },
			{ width: 150, title: '发货仓库编号及名称', key: 'c', },
			{ width: 150, title: '收货仓库编号及名称', key: 'd', },
			{ width: 100, title: '发货数量', key: 'e', },
			{ width: 100, title: '发货金额', key: 'f', },
			{ width: 100, title: '备注', key: 'note', },
			{ width: 100, title: '审核人', key: 'aa', },
			{ width: 80, title: '审核日期', key: 'bb', type: 'date' },
			{ width: 100, title: '登账人', key: 'cc', },
			{ width: 80, title: '登账日期', key: 'dd', type: 'date' },
		];

		return (
			<Container>
				<Header>{this.props.name}</Header>
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
