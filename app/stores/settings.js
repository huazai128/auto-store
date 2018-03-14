import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { get, post, postByParam } from 'utils/request'


const permissionsMaps = {
	'PERMISSION_VIEW_ATTR': '品类管理',
	'PERMISSION_VIEW_SKU': '货品管理',
	'PERMISSION_VIEW_STORE': '门店管理',
	'PERMISSION_VIEW_SUPPLIER': '供应商管理',
	'PERMISSION_VIEW_PURCHASE': '采购管理',
	'PERMISSION_VIEW_STOCKIN': '入库管理',
	'PERMISSION_VIEW_DISTRIBUTION': '配货管理',
	'PERMISSION_VIEW_SHIPMENT': '发货管理',
	'PERMISSION_VIEW_STORE_RECEIVE': '门店收货管理',
	'PERMISSION_VIEW_REFUND': '退厂管理',
	'PERMISSION_VIEW_STORE_REFUND': '退货管理',
	'PERMISSION_VIEW_REFUND_RECEIVE': '退货收货管理',
	'PERMISSION_VIEW_STOCKTAKING': '盘点管理',
	'PERMISSION_VIEW_SALE': '销售单管理',
	'PERMISSION_VIEW_INVENTORY': '库存查询表',
	'PERMISSION_VIEW_INVOICING': '进销存报表',
	'PERMISSION_VIEW_ROLE': '工作组配置',
	'PERMISSION_VIEW_ACCOUNT': '账号配置',
}

const childrenPermissionsMaps = {
	'UPDATE': '编辑',
	'ADD': '新增',
	'DEL': '删除',
	'INVOKE': '应用',
	'UNINVOKE': '反应用',
	'FROZEN': '冻结',
	'UNFORZEN': '反冻结',
	'CHECK': '审核',
	'UNCHECK': '反审',
	'CONFIRM': '登账',
	'UNCONFIRM': '反登',
	'ADD_ACCOUNT_GROUP': '新增部门',
	'DEL_ACCOUNT_GROUP': '删除部门',
}

const childrenPermissions = Object.keys(childrenPermissionsMaps)


useStrict(true)
class Store {
	@observable permissions = []
	@observable roles = []
	@observable loading = false

	@observable record = {}

	@action getData = async () => {
		this.loading = true
		const [permissionsResponse, rolesResponse] = await Promise.all([get('/api/roles/getGroupPermissions'), get('/api/roles')])

		const { data: permissions } = permissionsResponse
		const { data: roles } = rolesResponse

		runInAction(() => {
			this.loading = false
			this.permissions = permissions
			this.roles = roles
		})
	}

	@action getRoles = async () => {
		this.loading = true
		const { data } = await get('/api/roles')
		runInAction(() => {
			this.loading = false
			this.roles = data
		})
	}

	@action createRoles = async (values) => {
		await post('/api/roles/create', values)
		runInAction(this.getRoles)
	}

	@action deleteRoles = async () => {
		const { id } = this.record
		await post('/api/roles/delete', { id })
		runInAction(() => {
			this.record = {}
			this.getRoles()
		})
	}

	@action onClickSubMenu = ({ item, key, keyPath }) => {
		const { record } = item.props
		this.record = record
	}

	@action update = (assetPermissions) => {
		this.record.permissions = assetPermissions
		post('/api/roles/update', toJS(this.record))
	}

	@computed get permissionsMap() {
		return this.permissions.map(permission => {
			permission.permissions.map(item => {
				item.name = permissionsMaps[item.id] || item.id
				item.childs.forEach(i => {
					childrenPermissions.forEach(permission => {
						if (i.id.includes(permission)) i.name = childrenPermissionsMaps[permission] || i.id
					})
				})
			})
			return toJS(permission)
		})
	}

	@computed get defalutGroupValue() {
		return toJS(this.permissions)[0] && toJS(this.permissions)[0].id
	}
}

const store = new Store()

export default store
