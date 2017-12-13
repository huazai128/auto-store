import React, { Component } from 'react';
import { Modal } from 'antd';
import { observer, inject } from 'mobx-react';
import modal from 'hoc/modal';
import CustomFrom from 'components/Form';


@inject('product')
@modal
@observer
export default class extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				console.log(values);
				this.props.onConfirmLoading(true);
				await this.props.product.create(values);
				this.props.handleCancel();
			}
		});
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		const { fields } = this.props.product;

		return (
			<Modal
				title="添加款号资料"
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
