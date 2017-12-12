import React, { Component } from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';

import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import DyunFrom from 'components/Form';
import popover from 'hoc/modal/popover';

import ModalAdd from './modal-add';

const ButtonGroup = Button.Group;

// 综合筛选商品
@popover
class Popover_ extends Component {
	render() {
		return (
			<Button onClick={this.props.hide}>close</Button>
		);
	}
}



@inject('product')
@observer
export default class extends Component {
	store = this.props.product
	componentDidMount() {
		// this.store.getData();
	}

	render() {
		const { tableLoading } = this.store;
		return (
			<Container>
				<Header update={this.store.getData}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Button icon="check-circle-o" type="primary" ghost>应用</Button>
							<Button icon="close-circle-o" type="primary" ghost>反应用</Button>
						</ButtonGroup>
						<Button className="ml20" disabled type="danger">删除</Button>
						<ModalAdd>
							<Button className="ml40" type="primary">手动添加货品</Button>
						</ModalAdd>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
						<Popover_ title="综合筛选">
							<Button className="ml20" icon="filter" type="primary">综合筛选</Button>
						</Popover_>
					</HandleArea>
					<TableMain
						title={this.props.name}
						dataSource={this.store.dataSource}
						columns={this.store.columns}
						className="edit"
						loading={tableLoading}
					/>
				</Content>
			</Container>
		);
	}
}
