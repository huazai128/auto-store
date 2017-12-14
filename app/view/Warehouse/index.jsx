import React, { Component } from 'react';
import { Button, Tag, Modal, DatePicker } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';

import DyunFrom from 'components/Form';
import modal from 'hoc/modal';

const ButtonGroup = Button.Group;


@inject('warehouse')
@modal
@observer
class AddStoreModal extends Component {
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
		// for hoc modal
		const { visible, confirmLoading, handleCancel } = this.props;

		return (
			<Modal
				key="Modal"
				title="添加仓库资料"
				visible={visible}
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
				confirmLoading={confirmLoading}
				onCancel={e => handleCancel()}
			>
				<DyunFrom ref="form" fields={[
					...this.props.warehouse.fields
				]} />
			</Modal>
		);
	}
}

@inject('warehouse')
@observer
export default class extends Component {
	store = this.props.warehouse

	componentDidMount() {
		this.store.getData();
	}
	render() {
		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Button icon="lock" type="primary" ghost>冻结</Button>
							<Button icon="unlock" type="primary" ghost>取消冻结</Button>
						</ButtonGroup>
						<Button className="ml20" disabled type="danger">删除</Button>
						<AddStoreModal>
							<Button key="Button" className="ml40" type="primary">手动添加仓库资料</Button>
						</AddStoreModal>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
					</HandleArea>
					<this.store.RenderMainTable
						edit
						title={this.props.name}
						pagination={{ total: this.store.count }}
					/>
				</Content>
			</Container>
		);
	}
}
