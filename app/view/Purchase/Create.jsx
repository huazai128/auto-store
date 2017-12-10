import React, { Component } from 'react';
import { Button, Input, Form, DatePicker, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import Header from 'components/Header';
import CreateTable from 'components/CreateTable';
import { Container, Content, HandleArea } from 'components/Layout';
import CreateFormItem from 'components/Form/CreateFormItem';


@inject('Create')
@Form.create()
@observer
export default class extends Component {
	store = new this.props.Create();

	tableTitle = (
		<div>
			<strong>单据明细编辑</strong>
			<Button type="primary" className="ml20">参照制单</Button>
		</div>
	)

	handleSubmit = async () => {
		return await new Promise((resolve, reject) => {
			this.props.form.validateFields(async (err, values) => {
				if (!err) {
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
								<CreateFormItem label="入库单单号" rules={true} keyValue="a" getFieldDecorator={getFieldDecorator}>
									<Input style={{ width: 200 }} />
								</CreateFormItem>
								<CreateFormItem label="到货日期" rules={true} keyValue="b" getFieldDecorator={getFieldDecorator}>
									<DatePicker />
								</CreateFormItem>
								<CreateFormItem label="供应商信息" rules={true} keyValue="c" getFieldDecorator={getFieldDecorator}>
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
					<CreateTable title={() => this.tableTitle} />
				</Content>
			</Container>
		);
	}
}
