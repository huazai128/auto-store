import React, { Component } from 'react';
import { Button, Table, Tag, Form, Icon, Input, Select, Modal, } from 'antd';
import { observer, inject } from 'mobx-react';

import Header from 'components/Header';
import { Container, Content, HandleArea, TableMain } from 'components/Layout';
import DyunFrom from 'components/Form';
import modal from 'hoc/modal';

const { TextArea } = Input;
const Option = Select.Option;
const ButtonGroup = Button.Group;

@modal
@observer
class AddSkuModal  extends Component {
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
		return (
			[
				<Button key="Button" onClick={this.props.showModal} className="ml40" type="primary" ghost>手动添加款号</Button>,
				<Modal
					key="Modal"
					title="添加款号资料"
					visible={this.props.visible}
					afterClose={this.afterClose}
					onOk={this.handleSubmit}
					confirmLoading={this.props.confirmLoading}
					onCancel={() => this.props.handleCancel()}
				>
					<DyunFrom ref="form" fields={[
						{ label: '商品编号', key: 'a', rules: true, },
						{ label: '商品名称', key: 'b', rules: true, },
						{ label: '单款结算价', key: 'c', type: 'number', rules: true, },
						{ label: '单款采购价', key: 'd', type: 'number', rules: true, },
						{ label: '备注', key: 'e', node: <TextArea rows={4} /> },
						{
							label: '供应商',
							key: 'f',
							node: (
								<Select>
									<Option value="rmb">RMB</Option>
									<Option value="dollar">Dollar</Option>
								</Select>
							),
						},
					]} />
				</Modal>]
		);
	}
}


@observer
export default class extends Component {
	render() {
		const dataSource = [];

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
			{ width: 200, title: '时间', key: 'address', },
			{ width: 200, title: '时间', key: 'age', type: 'date' },
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
						<AddSkuModal />
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
