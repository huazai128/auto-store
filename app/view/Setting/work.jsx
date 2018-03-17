import React, { Component } from 'react'
import { Menu, Icon, Spin, Button, message, Select, Modal, Divider, Tabs, Tag } from 'antd'
import CreateHearder from 'components/Header/CreateHearder'
import CustomFrom from 'components/Form'
import { Container, Content } from 'components/Layout'
import { observer, inject } from 'mobx-react'
import modal from 'hoc/modal'
import { Limit } from 'components/Limit'

import WorkContent from './WorkContent'

import styles from './Work.less'

const Option = Select.Option
const SubMenu = Menu.SubMenu
const confirm = Modal.confirm
const TabPane = Tabs.TabPane

@inject('settings')
@modal
@observer
class AddWork extends Component {
	handleSubmit = (e) => {
		e.preventDefault()
		this.refs.form.validateFields(async (err, values) => {
			if (!err) {
				this.props.onConfirmLoading(true)

				try {
					await this.props.settings.createRoles(values)
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
				title="添加新工作组"
				width={400}
				afterClose={this.afterClose}
				onOk={this.handleSubmit}
			>
				<CustomFrom ref="form" fields={[
					{ label: '工作组名称', rules: { required: true }, key: 'name', },
					{
						label: '所属部门',
						rules: { required: true },
						key: 'groupId',
						initialValue: store.defalutGroupValue,
						node: (
							<Select>
								{store.permissions.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
							</Select>
						)
					},
				]} />
			</HocModal>
		)
	}
}


@inject('settings')
@observer
export default class extends Component {
	componentDidMount() {
		this.props.settings.getData()
	}

	deleteRoles = () => {
		confirm({
			title: '确定要删除该工作组?',
			content: '删除该工作组后不能为新增账号分配该工作组，但是已经分配该工作组权限的账号不会受到影响。',
			okType: 'danger',
			onOk: this.props.settings.deleteRoles
		})
	}

	render() {
		const { settings: store } = this.props

		const { record } = store

		const node = (
			<Limit permission="PERMISSION_ADD_ROLE">
				<AddWork>
					<Button className="ml20" type="primary">添加新工作组</Button>
				</AddWork>
			</Limit>
		)

		return (
			<Container>
				<CreateHearder node={node}>{this.props.name}</CreateHearder>
				<Content >
					{/* <Spin spinning={store.loading} > */}
					<div style={{ height: '100%' }} className="flex">
						<Menu
							mode="inline"
							className={styles.menu}
							style={{ width: 200, }}
							// openKeys={this.state.openKeys}
							onClick={store.onClickSubMenu}
						>
							{store.roles.map(item => (
								<SubMenu key={item.id} title={<span><Icon type="appstore" /><span>{item.name}</span></span>}>
									{item.roles.map(i => <Menu.Item record={i} key={i.id}>{i.name}</Menu.Item>)}
								</SubMenu>
							))}
						</Menu>
						<div style={{ margin: 10 }} className={`${styles.content} flex-g-1`}>
							{record.id && <div>
								<section className="flex-vcenter jc-between pr20 pl20">
									<div>工作组名称：<strong>{record.name}</strong></div>
									<Limit permission="PERMISSION_DEL_ROLE"><Button onClick={() => this.deleteRoles(record)} type="danger">删除该工作组</Button></Limit>
								</section>
								{/* <Divider dashed style={{ margin: '10px 0' }}>功能权限</Divider> */}
								<Tabs animated={false} defaultActiveKey="1">
									<TabPane tab="功能权限" key="1">
										<WorkContent />
									</TabPane>
									{/* <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane> */}
								</Tabs>
							</div>}
						</div>
					</div>
					{/* </Spin> */}
				</Content>
			</Container>
		)
	}
}
