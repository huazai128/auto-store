import React, { Component } from 'react';
import { Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import modal from 'hoc/modal';
import CustomFrom from 'components/Form';


@inject(stores => ({
	product: stores.product,
}))
@modal
@observer
export default class extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true);
				values.bigStyleId = values.styles[0];
				values.smallStyleId = values.styles[1];
				try {
					await this.props.product.create(values);
					this.props.handleCancel();
				} catch (error) {
					this.props.handleCancel();
				}
			}
		});
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		const { fields } = this.props.product;

		return (
			<Modal
				title="添加货品资料"
				visible={this.props.visible}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
				confirmLoading={this.props.confirmLoading}
				onCancel={() => this.props.handleCancel()}
			>
				<CustomFrom ref="form" fields={[
					...fields
				]}
				/>
			</Modal>
		);
	}
}
