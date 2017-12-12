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
				title="添加门店资料"
				visible={visible}
				onOk={this.handleSubmit}
				afterClose={this.afterClose}
				confirmLoading={confirmLoading}
				onCancel={e => handleCancel()}
			>
				<DyunFrom ref="form" fields={[
					{ label: '门店名称', key: 'a', rules: true, },
					{ label: '门店编号', key: 'b', rules: true, },
					{ label: '门店面积', key: 'casd', },
					{ label: '开业时间', key: 'd', node: <DatePicker /> },
					{ label: '门店地址', key: 'e', },
					{ label: '联系人', key: 'f', },
					{ label: '联系方式', key: 'g', },
					{ label: '物业联系人', key: 'h', },
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

		for (let index = 0; index < 20; index++) {
			dataSource.push({
				key: index,
				age: 32,
				address: '西湖区湖底公园1号',
				time: new Date().valueOf()
			});
		}

		const columns = [
			{ width: 100, title: '单据状态', key: 'state', render: () => <Tag>营业中</Tag>, },
			{ width: 150, title: '门店名称', key: 'b', },
			{ width: 150, title: '门店编号', key: 'c', },
			{ width: 80, title: '开业时间', key: 'd', type: 'date' },
			{ width: 100, title: '门店地址', key: 'e', },
			{ width: 100, title: '门店面积', key: 'note', },
			{ width: 100, title: '联系人', key: 'f', },
			{ width: 100, title: '联系电话', key: 'g', },
			{ width: 100, title: '备注', key: 'aa', },
			{ width: 100, title: '物业联系人', key: 'bb', },
			{ width: 100, title: '物业联系方式', key: 'cc', },
			{ width: 120, title: '物业备注', key: 'ddd', },
			{ width: 100, title: '运营负责人', key: 'ccc', },
			{ width: 100, title: '运营联系方式', key: 'ddfdf', },
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
						<Button className="ml20" disabled type="danger">删除</Button>
						<AddStoreModal>
							<Button key="Button" className="ml40" type="primary">手动添加门店资料</Button>
						</AddStoreModal>
						<Button className="ml20" type="primary" ghost>Excel导入资料</Button>
						<Button className="ml20" type="primary" ghost>Excel导出资料</Button>
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
