import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';

const ButtonGroup = Button.Group;

@observer
export default class extends Component {

	render() {
		const dataSource = [];
		console.log(123);

		for (let index = 0; index < 100; index++) {
			dataSource.push({
				key: index,
				state: 'confirmed',
				age: 32,
				address: '西湖区湖底公园1号',
				time: new Date().valueOf()
			});
		}

		const columns = [
			{
				width: 200,
				title: '状态',
				key: 'state',
				type: 'state',
				stateInfo: {
					confirmed: '货品资料已在系统内生效，且已有数据产生，不可反应用，但可以修改供应商信息及自定义属性内容！',
					checked: '货品资料已在系统内生效，但尚未产生数据，可以修改供应商信息及自定义属性内容！',
					pending: '货品资料没有在系统内生效，可修改所有资料内容，也可进行删除！'
				}
			},
			{ width: 200, title: '时间', key: 'time', type: 'date' },
		];

		return (
			<Container>
				<Header>{this.props.name}</Header>
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
					<TableMain
						title={this.props.name}
						dataSource={dataSource}
						columns={columns}
						className=""
					/>
				</Content>
			</Container>
		);
	}
}
