import React, { Component } from 'react';
import { Button, Table, Tag, Form, Icon, Input, Select, Modal, Popover } from 'antd';
import { observer, inject } from 'mobx-react';

import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import DyunFrom from 'components/Form';
import modal from 'hoc/modal';
import popover from 'hoc/modal/popover';

const { TextArea } = Input;
const Option = Select.Option;
const ButtonGroup = Button.Group;

@inject('product')
@modal
@observer
class AddSkuModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				this.props.onConfirmLoading(true);
				setTimeout(() => {
					this.props.handleCancel();
				}, 2000);
			}
		});
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		// console.log(this.props.product.fields);
		const { fields } = this.props.product;

		return (
			<Modal
				title="添加款号资料"
				visible={this.props.visible}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
				confirmLoading={this.props.confirmLoading}
				onCancel={() => this.props.handleCancel()}
			>
				<DyunFrom ref="form" fields={[
					...fields
				]}
				/>
			</Modal>
		);
	}
}

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
		this.store.getData();
	}

	render() {
		const { tableLoading } = this.store;

		console.log(this.store.dataSource);

		return (
			<Container>
				<Header update={this.store.getData}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Button type="primary" ghost>应用</Button>
							<Button type="primary" ghost>反应用</Button>
						</ButtonGroup>
						<Button className="ml20" disabled type="danger">删除</Button>
						<AddSkuModal>
							<Button className="ml40" type="primary">手动添加货品</Button>
						</AddSkuModal>
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
