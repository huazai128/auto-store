import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Button, Table, Tag, Menu, Modal, message, Icon, Select } from 'antd'
import modal from 'hoc/modal'
import CustomFrom from 'components/Form'

const ButtonGroup = Button.Group
const SubMenu = Menu.SubMenu
const confirm = Modal.confirm
const { Option, OptGroup } = Select

@inject('accounts')
@modal
@observer
export class ModifyPassword extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				const { record } = this.props

				this.props.onConfirmLoading(true)

				values.id = record.id

				try {
					await this.props.accounts.changePassword(values)
					this.props.handleCancel()
					message.success('修改密码成功')

				} catch (error) {
					this.props.onConfirmLoading(false)
				}
			}
		})
	}

	afterClose = () => this.form.resetFields()

	render() {
		const { HocModal } = this.props
		const { accounts: store } = this.props

		const isEdit = !!this.props.record

		return (
			<HocModal
				title={isEdit ? '编辑账号信息' : '新增部门账号'}
				width={500}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref={ele => this.form = ele} fields={[
					{ label: '新密码', rules: { required: true, min: 6, message: '密码必须大于6位数' }, key: 'password', },
				]} />
			</HocModal>
		)
	}
}


@inject('accounts')
@modal
@observer
export default class AddAccounts extends Component {

	constructor(props) {
		super(props)

		this.fields = [
			{ label: '账号', rules: { required: true }, key: 'username', },
			{ label: '密码', rules: { required: true, min: 6, message: '密码必须大于6位数' }, key: 'password', editHide: true },
			{ label: '用户姓名', rules: { required: true }, key: 'name', },
			{
				label: '分配工作组',
				rules: { required: true },
				key: 'roleIds',
				node: (
					<Select mode="multiple">
						{this.props.accounts.roles.map(item => (
							<OptGroup key={item.id} label={item.name}>
								{item.roles.map(i => <Option key={i.id} value={i.id}>{i.name}</Option>)}
							</OptGroup>
						))}
					</Select>
				)
			},
			{ label: '手机号', key: 'mobile', },
			{ label: 'E-mail', key: 'email', },
			// { label: '备注', key: 'note', },
		]

		if (props.record) {
			this.fields = this.fields.filter(i => !i.editHide)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.form.validateFields(async (err, values) => {
			if (!err) {
				const { roles, record } = this.props.accounts

				values.permissions = []
				values.targetId = record.targetId
				values.type = record.type

				// roles.forEach(item => {
				// 	item.roles.forEach(role => {
				// 		if (values.roleIds.includes(role.id)) values.permissions = [...new Set([...values.permissions, ...role.permissions])]
				// 	})
				// })

				if (this.props.record) values.id = this.props.record.id

				this.props.onConfirmLoading(true)

				try {
					await this.props.accounts.create(values)
					this.props.handleCancel()
					message.success('操作成功')

				} catch (error) {
					this.props.onConfirmLoading(false)
				}
			}
		})
	}

	afterClose = () => this.form.resetFields()

	showAfter = () => {
		const { record } = this.props

		setTimeout(() => {
			record && this.form && this.form.setFieldsValue({
				username: record.username,
				mobile: record.mobile,
				email: record.email,
				name: record.name,
				note: record.note,
				roleIds: record.roles.map(i => i.id)
			})
		}, 200)

	}


	render() {
		const { HocModal } = this.props
		const { accounts: store } = this.props

		const isEdit = !!this.props.record

		return (
			<HocModal
				title={isEdit ? '编辑账号信息' : '新增部门账号'}
				width={500}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref={ele => this.form = ele} fields={this.fields} />
			</HocModal>
		)
	}
}
