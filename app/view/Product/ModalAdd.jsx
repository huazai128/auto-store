import React, { Component } from 'react'
import { Modal, message } from 'antd'
import { observer, inject } from 'mobx-react'
import modal from 'hoc/modal'
import CustomFrom from 'components/Form'


@inject(stores => ({
	product: stores.product,
	}))
@modal
@observer
export default class extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true)
				values.bigStyleId = values.styles[0]
				values.smallStyleId = values.styles[1]
				try {
					await this.props.product.create(values)
					this.props.handleCancel()
					message.success('操作成功')

				} catch (error) {
					this.props.onConfirmLoading(false)
					// this.props.handleCancel();
				}
			}
		})
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		const { fields } = this.props.product
		const { HocModal } = this.props

		return (
			<HocModal
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref="form" fields={[
					...fields
				]}
				/>
			</HocModal>
		)
	}
}
