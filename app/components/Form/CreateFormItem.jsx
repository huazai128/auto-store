import React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;


export default ({ getFieldDecorator, children, label, keyValue, rules }) => {
	const placeholder = `请输入${label}`;

	const itmeNode = React.cloneElement(children, { placeholder, });

	return (
		<section className="mr30">
			<p style={{marginBottom: 2}}><strong>{label}</strong></p>
			<FormItem>
				{getFieldDecorator(keyValue, {
					rules: rules ? [{ required: true, message: placeholder, ...rules }] : [],
				})(itmeNode)}
			</FormItem>
		</section>
	);
};
