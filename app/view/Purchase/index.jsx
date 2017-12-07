import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';

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
			{ title: '姓名', dataIndex: 'name', key: 'name', render: () => <Tag>未应用</Tag> },
			{ title: '时间', dataIndex: 'time', key: 'time', type: 'date' }];

		return (
			<Container>
				<Header btn={{ to: '/Purchase/Create', text: '采购制单' }}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Button type="primary" ghost>应用</Button>
							<Button type="primary" ghost>反应用</Button>
						</ButtonGroup>
						<Button className="ml40" type="primary" ghost>手动添加款号</Button>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<Button className="ml20" icon="filter" type="primary">综合筛选</Button>
					</HandleArea>
					<TableMain dataSource={dataSource} columns={columns} />
				</Content>
			</Container>
		);
	}
}
