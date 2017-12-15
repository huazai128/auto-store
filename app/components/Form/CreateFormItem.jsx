import React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;


export default ({ getFieldDecorator, children, label, keyValue, rules, ...reset }) => {
	const placeholder = `请输入${label}${rules ? '' : '（非必填）'}`;

	// const itmeNode = React.cloneElement(children, { placeholder, });

	return (
		!children ? <FormItem style={{ display: 'none' }}>
			{getFieldDecorator(
				keyValue,
				{
					rules: [],
					...reset
				}
			)(<div />)}
		</FormItem>
			:
			<section className="mr30">
				<p style={{ marginBottom: 4, paddingLeft: 5 }}><strong>{label}</strong></p>
				<FormItem>
					{getFieldDecorator(
						keyValue,
						{
							rules: rules ? [{ required: true, message: placeholder, ...rules }] : [],
							...reset
						}
					)(React.cloneElement(children, { placeholder, }))}
				</FormItem>
			</section>
	);
};
