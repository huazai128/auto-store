import React, { Component } from 'react';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';

import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import DyunFrom from 'components/Form';
import HandleButtonOrigin from 'components/Button';
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
		const { tableLoading, selectedRows } = this.store;
		const HandleButton = ({ children, ...reset }) => React.cloneElement(<HandleButtonOrigin>{children}</HandleButtonOrigin>, { selectedRows, store: this.store, ...reset });

		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<HandleButton method="invoke" state="created" icon="check-circle-o">应用</HandleButton>
							<HandleButton method="uninvoke" state="invoke" icon="close-circle-o">反应用</HandleButton>
						</ButtonGroup>
						<HandleButton
							method="delete"
							className="ml20"
							type="danger"
							state="created"
							confirm={{title: '确定要删除选中货品？'}}
						>
							删除
						</HandleButton>
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
						edit={{
							store: this.store
						}}
						store={this.store}
						loading={tableLoading}
						pagination={{ total: this.store.count }}
					/>
				</Content>
			</Container>
		);
	}
}
