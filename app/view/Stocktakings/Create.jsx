import React, { Component } from 'react';
import { Button, Input, Form, Icon, Modal, DatePicker, Radio } from 'antd';
import { observer, inject } from 'mobx-react';
import Header from 'components/Header';
import CreateTable from 'components/CreateTable';
import { Container, Content, HandleArea } from 'components/Layout';
import CreateFormItem from 'components/Form/CreateFormItem';
import SearchPro from 'components/SearchPro';
import modal from 'hoc/modal';
import moment from 'moment';

const RadioGroup = Radio.Group;

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
								<CreateFormItem label="盘点单单号" rules={true} keyValue="a" getFieldDecorator={getFieldDecorator}>
									<Input style={{ width: 200 }} />
								</CreateFormItem>

								<CreateFormItem label="盘点店铺" rules={true} keyValue="c" getFieldDecorator={getFieldDecorator}>
									<Input suffix={<Icon type="ellipsis" />} style={{ width: 200 }} />
								</CreateFormItem>

								<CreateFormItem
									initialValue={moment().startOf('day')}
									label="盘点日期"
									rules={true}
									keyValue="b"
									getFieldDecorator={getFieldDecorator}
								>
									<DatePicker />
								</CreateFormItem>
							</div>
							<div className="flex-vcenter">
								<CreateFormItem
									label="盘点范围"
									rules={true}
									keyValue="sdasd"
									initialValue={1}
									getFieldDecorator={getFieldDecorator}
								>
									<RadioGroup>
										<Radio value={1}>全局盘点</Radio>
										<Radio value={2}>局部盘点</Radio>
									</RadioGroup>
								</CreateFormItem>
								<CreateFormItem label="备注" keyValue="note" getFieldDecorator={getFieldDecorator}>
									<Input style={{ width: 300 }} />
								</CreateFormItem>
							</div>
						</HandleArea>
					</Form>
					<CreateTable title={() => (
						<div>
							<strong>单据明细编辑</strong>
							<SearchPro />
							{/* <Button type="primary" ghost className="ml20">选择添加商品</Button> */}
							<Button type="primary" ghost className="ml20">Excel导入商品</Button>
						</div>
					)} />
				</Content>
			</Container>
		);
	}
}
