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
				title="添加供应商"
				visible={visible}
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
				confirmLoading={confirmLoading}
				onCancel={e => handleCancel()}
			>
				<DyunFrom ref="form" fields={[
					{ label: '供应商名称', key: 'a', rules: true, },
					{ label: '供应商编号', key: 'b', rules: true, },
					{ label: '联系人', key: 'f', },
					{ label: '联系电话', key: 'g', },
					{ label: '地址', key: 'e', },
					{ label: '传真号', key: 'c', },
					{ label: '邮箱地址', key: 'cdsd', },
					{ label: '备注', key: 'i', node: <TextArea rows={4} /> },

				]} />
			</Modal>
		);
	}
}

/* main */
// ============================================================


@observer
export default class extends Component {
	render() {
		const dataSource = [];

		for (let index = 0; index < 10; index++) {
			dataSource.push({
				key: index,
				number: 32,
				name: '北明代理商',
				a: '北明代理商',
				b: '北明代理商',
				c: '北明代理商',
				d: '北明代理商',
				e: '北明代理商',
				f: '北明代理商',
				time: new Date().valueOf()
			});
		}

		const columns = [
			{ width: 100, title: '状态', key: 'state', render: () => <Tag>合作中</Tag> },
			{ width: 100, title: '供应商名称', key: 'name', },
			{ width: 100, title: '供应商编号', key: 'number', },
			{ width: 100, title: '联系人', key: 'a' },
			{ width: 100, title: '联系电话', key: 'b' },
			{ width: 100, title: '地址', key: 'c' },
			{ width: 100, title: '传真号', key: 'd' },
			{ width: 100, title: '邮箱地址', key: 'e' },
			{ width: 100, title: '备注', key: 'f' },
		];
		return (
			<Container>
				<Header>{this.props.name}</Header>
				<Content>
					<HandleArea>
						<ButtonGroup>
							<Button icon="lock" type="primary" ghost>冻结</Button>
							<Button icon="unlock" type="primary" ghost>取消冻结</Button>
						</ButtonGroup>
						<AddStoreModal>
							<Button key="Button" className="ml40" type="primary">手动添加供应商</Button>
						</AddStoreModal>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
					</HandleArea>
					<TableMain
						title={this.props.name}
						dataSource={dataSource}
						columns={columns}
						className=""
						loading={false}
					/>
				</Content>
			</Container>
		);
	}
}
