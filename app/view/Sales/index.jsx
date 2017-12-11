import React, { Component } from 'react';
import { Button, Table, Tag } from 'antd';
import Header from 'components/Header';
import { RangePicker } from 'components/DatePicker';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';
const ButtonGroup = Button.Group;

@observer
export default class extends Component {

	render() {
		const dataSource = [{
			key: '1',
			b: 'test-2017-06-15',
			c: 'number-008',
			d: '店铺名称',
			e: 98,
			f: 0.5,
			g: 4396,
			time: new Date().valueOf()
		}, {
			key: '2',
			b: 'test-2017-06-15',
			c: 'number-008',
			d: '店铺名称',
			e: 98,
			f: 0.5,
			g: 4396,
			time: new Date().valueOf()
		}];

		const columns = [
			{ width: 150, title: '单号', key: 'b', },
			{ width: 150, title: '门店编号', key: 'c', },
			{ width: 150, title: '门店名称', key: 'd', },
			{ width: 150, title: '购买商品数量', key: 'e', },
			{ width: 150, title: '整单折扣', key: 'f', },
			{ width: 150, title: '实收金额', key: 'g', },
			{ width: 150, title: '销售时间', key: 'time', type: 'date' },
		];

		return (
			<Container>
				<Header>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<div className="flex-vcenter ml10">
							查询日期：
							<RangePicker />
						</div>
					</HandleArea>
					<TableMain
						dataSource={dataSource}
						title={this.props.name}
						noRowSelection
						columns={columns} />
				</Content>
			</Container>
		);
	}
}
