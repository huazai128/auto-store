import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { observer } from 'mobx-react'

export default observer(({ children, method, state = '', store, confirm, ...rest }) => {
	const ids = store.selectedRows.map(i => i.id)

	const checkout = (selectedRows, state) => {
		if (selectedRows.length == 0) return

		if (Array.isArray(state)) {
			var result = true
			selectedRows.forEach(item => {
				if (!state.includes(item.state)) result = false
			})
			return result
		}
		if (selectedRows.some(item => item.state !== state)) return

		return true
	}

	const onClick = () => {
		if (!method) return console.error('props method is required')

		if (confirm) {
			return Modal.confirm({
				title: confirm.title || '确定要删除选中单据？',
				okType: 'danger',
				maskClosable: true,
				onOk: async () => {
					return await store.handle(method, ids)
				},
			})
		}
		store.handle(method, ids)
	}

	const handleButton = React.cloneElement(
		<Button>{children}</Button>,
		{
			disabled: !checkout(store.selectedRows, state),
			onClick,
			type: 'primary',
			ghost: true,
			...rest
		}
	)

	return handleButton
})
