import React, { Component } from 'react';
import { Button, Table, Tag, Form, Icon, Input, Select, Modal, DatePicker } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import { observer, inject } from 'mobx-react';

import DyunFrom from 'components/Form';
import modal from 'hoc/modal';

const ButtonGroup = Button.Group;
const { TextArea } = Input;
const Option = Select.Option;


@inject('supplier')
@modal
@observer
class AddStoreModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true);
				await this.props.supplier.createSupplier(values);
				this.props.handleCancel();
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
				title="添加供应商"
				visible={visible}
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
				confirmLoading={confirmLoading}
				onCancel={e => handleCancel()}
			>
				<DyunFrom ref="form" fields={[
					...this.props.supplier.fields
				]} />
			</Modal>
		);
	}
}

/* main */
// ============================================================

@inject('supplier')
@observer
export default class extends Component {
	store = this.props.supplier

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
							<Button key="Button" className="ml40" type="primary">手动添加供应商</Button>
						</AddStoreModal>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
					</HandleArea>
					<TableMain
						title={this.props.name}
						dataSource={this.store.dataSource}
						columns={this.store.columns}
						edit={{
							store: this.store
						}}
						store={this.store}
						loading={this.store.tableLoading}
						pagination={{ total: this.store.count }}
					/>
				</Content>
			</Container>
		);
	}
}
