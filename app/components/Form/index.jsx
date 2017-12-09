import React, { Component } from 'react';
import { Form, Input, InputNumber } from 'antd';
const FormItem = Form.Item;


const formItemLayout = {
	labelCol: { span: 7 },
	wrapperCol: { span: 12 },
};


@Form.create()
export default class extends React.Component {
	render() {
		const { getFieldDecorator } = this.props.form;
		const { fields = [] } = this.props;

		const fieldNode = fields.map(item => {
			const { label, rules, key, type } = item;
			const placeholder = `请输入${label}`;
			const node = item.node
				? React.cloneElement(item.node, { placeholder, style: { width: '100%' } })
				: React.cloneElement(type == 'number' ? <InputNumber /> : <Input />, { placeholder, style: { width: '100%' } });

			return (
				<FormItem key={key} label={label} {...formItemLayout}>
					{getFieldDecorator(key, {
						rules: rules ? [{ required: true, message: `请输入${label}!`, ...rules }] : [],
					})(node)}
				</FormItem>
			);
		});

		return (
			<Form>{fieldNode}</Form>
		);
	}
}
