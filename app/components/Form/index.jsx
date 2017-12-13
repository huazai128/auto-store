import React, { Component } from 'react';
import { Form, Input, InputNumber } from 'antd';
const FormItem = Form.Item;



@Form.create()
export default class extends React.Component {
	render() {
		const formItemLayout = this.props.formItemLayout || {
			labelCol: { span: 7 },
			wrapperCol: { span: 12 },
		};

		const { getFieldDecorator } = this.props.form;
		const { fields = [] } = this.props;

		const fieldNode = fields.map(item => {
			const { label, rules, key, type, getWrap, ...reset, } = item;

			const getPopupContainer = getWrap ? {
				getPopupContainer: () => this.refs.wrap
			} : {};

			const placeholder = `请输入${label}`;
			const node = item.node
				? React.cloneElement(item.node, { placeholder, style: { width: '100%', }, ...getPopupContainer })
				: React.cloneElement(type == 'number' ? <InputNumber min={0} /> : <Input />, { placeholder, style: { width: '100%' } });

			return (
				<FormItem key={key} label={label} {...formItemLayout}>
					{getFieldDecorator(key, {
						rules: rules ? [{ message: `请输入${label}!`, ...rules }] : [],
						...reset
					})(node)}
				</FormItem>
			);
		});

		return (
			<div ref="wrap"><Form>{fieldNode}</Form></div>
		);
	}
}
