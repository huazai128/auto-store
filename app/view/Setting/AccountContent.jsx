import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import TableBasic from 'components/Table/Basic'
import { Divider, Popconfirm, Badge } from 'antd'

import modal from 'hoc/modal'

import AccountCreate, { ModifyPassword } from './AccountCreate'
import { Limit } from 'components/Limit'


@inject('accounts')
@observer
export default class extends Component {
	store = this.props.accounts

	render() {
		const { store } = this

		const columns = [
			{ title: '账号', key: 'username', },
			{ title: '姓名', key: 'name', },
			{ width: 80, title: '状态', key: 'ban', render: text => !text ? <Badge status="success" text="正常" /> : <Badge status="default" text="已禁用" /> },
			{ title: '所属工作组', key: 'role', render: (_, record) => <div>{record.roles.map(i => i.name).toString()}</div> },
			{ title: '手机号', key: 'mobile', },
			{ title: '邮箱', key: 'email', },
			// { title: '备注', key: 'note', },
			{
				title: <div className="flex-center">操作</div>,
				key: 'op',
				width: 150,
				render: (_, record) => {
					const { ban } = record

					if (ban) return (
						<div className="flex jc-end">
							<Limit permission="PERMISSION_UPDATE_ACCOUNT">
								<Popconfirm onConfirm={() => store.unban(record)} title="将该账号解禁？">
									<a>解除禁用</a>
								</Popconfirm>
							</Limit>
						</div>
					)

					return (
						<div className="flex jc-end">
							<Limit permission="PERMISSION_UPDATE_ACCOUNT">
								<AccountCreate record={record}>
									<a>编辑</a>
								</AccountCreate>
								<Divider type="vertical" />
								<ModifyPassword record={record}>
									<a>修改密码</a>
								</ModifyPassword>
								<Divider type="vertical" />
								<Popconfirm onConfirm={() => store.ban(record)} title="确定要禁用该账号？">
									<a>禁用</a>
								</Popconfirm>
								<Divider type="vertical" />
							</Limit>
							<Limit permission="PERMISSION_DEL_ACCOUNT">
								<Popconfirm onConfirm={() => store.delete(record)} title="确定要删除？">
									<span style={{cursor: 'pointer'}} className="error-color">删除</span>
								</Popconfirm>
							</Limit>
						</div>
					)
				}
			},
		]

		return (
			<div>
				<TableBasic
					dataSource={store.dataSource}
					pagination={{ pageSize: 20 }}
					columns={columns}
					original
					loading={store.tableLoading} />
			</div>
		)
	}
}
