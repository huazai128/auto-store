import React, { Component } from 'react';
import { Button, Table, Tag, Form, Icon, Input, Modal, DatePicker } from 'antd';
import Header from 'components/Header';
import { Container, Content, HandleArea } from 'components/Layout';
import { observer, inject } from 'mobx-react';
import Upload from 'components/Upload';

import DyunFrom from 'components/Form';
import modal from 'hoc/modal';

const ButtonGroup = Button.Group;

@inject('supplier')
@modal
@observer
class AddStoreModal extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true);
				await this.props.supplier.create(values);
				this.props.handleCancel();
			}
		});
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		// for hoc modal
		const { visible, confirmLoading, handleCancel, HocModal } = this.props;

		return (
			<HocModal
				title="添加供应商"
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
			>
				<DyunFrom ref="form" fields={[
					...this.props.supplier.fields
				]} />
			</HocModal>
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
		this.store.init();
	}

	render() {
		const { HandleButton } = this.store;
		return (
			<Container>
				<Header store={this.store}>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<HandleButton method="freeze" state={['created_no', 'created']} icon="lock" >冻结</HandleButton>
							<HandleButton method="unfreeze" state="freeze" icon="unlock" >取消冻结</HandleButton>
						</ButtonGroup>
						<HandleButton
							style={{ marginLeft: 20 }}
							type="danger"
							state="created_no"
							method="delete"
							confirm={{
								title: '确定删除选中供应商？'
							}}
						>删除
						</HandleButton>
						<AddStoreModal>
							<Button key="Button" className="ml40" type="primary">手动添加供应商</Button>
						</AddStoreModal>
						<Upload handleConfirm={() => { /* handleConfirm */ }}><Button className="ml20" icon="file-excel" type="primary" ghost>Excel导入资料</Button></Upload>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
					</HandleArea>
					<this.store.RenderMainTable
						edit
						title={this.props.name}
					/>
				</Content>
			</Container>
		);
	}
}
