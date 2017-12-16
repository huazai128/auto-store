import React, { Component } from 'react';
import { Button, Input, Form, Select, Icon, Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import Header from 'components/Header';
import CreateTable from 'components/CreateTable';
import { Container, Content, HandleArea } from 'components/Layout';
import CreateFormItem from 'components/Form/CreateFormItem';
import SearchPro from 'components/SearchPro';
import modal from 'hoc/modal';

const { Option } = Select;

@inject('Create') @Form.create() @observer
export default class extends Component {
	store = new this.props.Create();

	handleSubmit = async () => {
		return await new Promise((resolve, reject) => {
			this.props.form.validateFields(async (err, values) => {
				if (!err) {
					console.log(values);
					setTimeout(() => {
						resolve(values);
					}, 2000);
				} else reject('');
			});
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Container>
				<Header asyncBack={{ asyncAction: this.handleSubmit }} type="create">{this.props.name}</Header>
				<Content style={{ padding: 10 }}>
					<Form>
						<HandleArea className="create-handle-area" style={{ margin: 0 }}>
							<div className="flex-vcenter">
								<CreateFormItem label="退仓单单号" rules={true} keyValue="a" getFieldDecorator={getFieldDecorator}>
									<Input style={{ width: 200 }} />
								</CreateFormItem>

								<CreateFormItem label="退仓类型" rules={true} keyValue="b" getFieldDecorator={getFieldDecorator}>
									<Select style={{ width: 150 }}>
										<Option value="rmb">默认退仓</Option>
										<Option value="dollar">什么退货类型</Option>
									</Select>
								</CreateFormItem>

								<CreateFormItem label="收货仓库编号及名称" rules={true} keyValue="c" getFieldDecorator={getFieldDecorator}>
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</CreateFormItem>

								<CreateFormItem label="发货仓库编号及名称" rules={true} keyValue="send" getFieldDecorator={getFieldDecorator}>
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</CreateFormItem>
							</div>
							<div className="flex-vcenter">
								<CreateFormItem label="备注" keyValue="note" getFieldDecorator={getFieldDecorator}>
									<Input style={{ width: 350 }} />
								</CreateFormItem>
							</div>
						</HandleArea>
					</Form>
					<CreateTable title={() => (
						<div>
							<strong>单据明细编辑</strong>
							<SearchPro />
							<Button type="primary" ghost className="ml20">选择添加商品</Button>
							<Button type="primary" ghost className="ml20">Excel导入商品</Button>
						</div>
					)} />
				</Content>
			</Container>
		);
	}
}
