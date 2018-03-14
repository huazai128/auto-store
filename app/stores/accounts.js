import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { get, post, postByParam } from 'utils/request'

useStrict(true)
class Store {
	@observable groupsData = []
	@observable record = {}
	@observable roles = []


	@observable data = []
	@observable tableLoading = false

	@action getGroups = async () => {
		const { data } = await get('/api/accounts/getGroups', { size: 999, type: 'HQ' })
		runInAction(() => {
			this.groupsData = data
		})
	}


	@action getRoles = async () => {
		const { data } = await get('/api/roles')
		runInAction(() => {
			this.roles = data
		})
	}

	@action createGroups = async (values) => {
		await post('/api/accounts/createGroup', values)
		runInAction(this.getGroups)
	}

	@action deleteGroup = async (values) => {
		const { record } = this

		const { targetId, type } = record

		await post('/api/accounts/deleteGroup', { targetId, type })
		runInAction(() => {
			this.record = {}
			this.getGroups()
		})
	}

	@action create = async (values) => {
		const { data: roles } = await get('/api/roles')

		roles.forEach(item => {
			item.roles.forEach(role => {
				if (values.roleIds.includes(role.id)) values.permissions = [...new Set([...values.permissions, ...role.permissions])]
			})
		})

		await post(`/api/accounts/${values.id ? 'update' : 'create'}`, values)

		runInAction(this.getData)
	}

	@action delete = async (record) => {
		await post('/api/accounts/delete', { ids: [record.id] })
		runInAction(this.getData)
	}

	@action ban = async (record) => {
		await post('/api/accounts/ban', { id: record.id })
		runInAction(this.getData)
	}

	@action unban = async (record) => {
		await post('/api/accounts/unban', { id: record.id })
		runInAction(this.getData)
	}

	@action changePassword = async (values) => {
		await post('/api/accounts/changePassword', values)
		runInAction(this.getData)
	}

	@action getData = async () => {
		const query = {
			targetId: this.record.targetId,
			type: this.record.type
		}

		this.tableLoading = true
		const { data } = await get('/api/accounts/getGroupUsers', query)

		runInAction(() => {
			this.tableLoading = false
			this.data = data
		})
	}

	@action onClickSubMenu = ({ item, key, keyPath }) => {
		const { record } = item.props
		if (this.record.targetId == record.targetId) return
		this.record = record
		this.getData()
	}

	@computed get dataSource() {
		return toJS(this.data)
	}
}

const store = new Store()

export default store
