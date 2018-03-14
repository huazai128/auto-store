import React, { Component } from 'react'
import { Button, Table, Tag, Menu, Modal, message, Icon } from 'antd'
import CreateHearder from 'components/Header/CreateHearder'
import { Container, Content, HandleArea, TableMain } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import modal from 'hoc/modal'
import CustomFrom from 'components/Form'

import styles from './account.less'

import AccountContent from './AccountContent'
import AccountCreate from './AccountCreate'
import { Limit } from 'components/Limit'

const ButtonGroup = Button.Group
const SubMenu = Menu.SubMenu
const confirm = Modal.confirm

@inject('accounts')
@modal
@observer
class AddWork extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true)

				try {
					await this.props.accounts.createGroups({ ...values, type: 'HQ' })
					this.props.handleCancel()
					message.success('操作成功')
				} catch (error) {
					this.props.onConfirmLoading(false)
				}
			}
		})
	}

	afterClose = () => this.refs.form.resetFields()

	render() {
		const { HocModal } = this.props
		const { settings: store } = this.props

		return (
			<HocModal
				title="添加新部门"
				width={400}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref="form" fields={[
					{ label: '部门名称', rules: { required: true }, key: 'name', },
				]} />
			</HocModal>
		)
	}
}



@inject('accounts')
@observer
export default class extends Component {
	store = this.props.accounts

	componentDidMount() {
		this.store.getGroups()
		this.store.getRoles()
	}

	delete = () => {
		confirm({
			title: '确定要删除该部门?',
			content: '删除该部门后将会清空部门内的全部账号。',
			okType: 'danger',
			onOk: this.props.accounts.deleteGroup
		})
	}

	render() {
		const { store } = this

		const node = (
			<Limit permission="PERMISSION_ADD_ACCOUNT_GROUP">
				<AddWork>
					<Button className="ml20" type="primary">添加新部门</Button>
				</AddWork>
			</Limit>
		)

		return (
			<Container>
				<CreateHearder node={node}>{this.props.name}</CreateHearder>
				<Content>
					<div style={{ height: '100%' }} className="flex">
						<Menu
							mode="inline"
							className={styles.menu}
							style={{ width: 150, }}
							onClick={store.onClickSubMenu}
						>
							{store.groupsData.map(i => <Menu.Item record={i} key={i.targetId}>{i.name}</Menu.Item>)}
						</Menu>
						<div style={{ margin: 10 }} className={`${styles.content} flex-g-1`}>
							{store.record.targetId &&
								<div className="mb10 pb10 pr20 pl20">
									<section className="flex-vcenter jc-between mb10">
										<span className={styles.header}>{store.record.name}账号列表:</span>
										<div>
											<Limit permission="PERMISSION_ADD_ACCOUNT">
												<AccountCreate>
													<Button type="primary">新增部门账号</Button>
												</AccountCreate>
											</Limit>
											<Limit permission="PERMISSION_DEL_ACCOUNT_GROUP">
												<Button className="ml20" onClick={() => this.delete()} type="danger">删除该部门</Button>
											</Limit>
										</div>
									</section>
									<AccountContent />
								</div>}
						</div>
					</div>
				</Content>
			</Container>
		)
	}
}
