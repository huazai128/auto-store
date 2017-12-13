import React, { Component } from 'react';
import { Button, Modal } from 'antd';

export default ({ children, selectedRows = [], method, state = '', store, confirm, ...reset }) => {
	const ids = selectedRows.map(i => i.id);

	const checkout = (selectedRows, state) => {
		if (selectedRows.length == 0 || selectedRows.some(item => item.state !== state)) return;
		return true;
	};

	const onClick = () => {
		if (confirm) {
			return Modal.confirm({
				title: confirm.title,
				okType: 'danger',
				onOk: async () => {
					return await store.handle(method, ids);
				},
			});
		}
		store.handle(method, ids);
	};

	const handleButton = React.cloneElement(
		<Button>{children}</Button>,
		{
			disabled: !checkout(selectedRows, state),
			onClick,
			type: 'primary',
			ghost: true,
			...reset
		}
	);

	return handleButton;
};
