import React, { Component } from 'react'
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'
import { stateFilters } from 'mapStore/filter'
import axios from 'axios'
import database from './database'

useStrict(true)

class Store {
	constructor() {
		this.storeName = 'wuren_user_data'
		this.IS_LOAD = false
		// this.init();
	}

	@observable userData = {}

	@action setUserData = (userData) => {
		this.IS_LOAD = false
		// 计算token到期时间
		// userData.expireTime = new Date().valueOf() + userData.expires_in * 1000;
		window.localStorage.setItem(this.storeName, JSON.stringify(userData))
		this.validate()
	}

	@action validate = () => {
		this.userData = JSON.parse(window.localStorage.getItem(this.storeName)) || {}

		if (this.userData.access_token) {
			if (new Date().valueOf() >= this.userData.expireTime) {
				window.localStorage.clear(this.storeName)
				return false
			}
			else {
				this.loadData()
				return true
			}
		}
		window.localStorage.clear(this.storeName)
		return false
	}

	@action loadData = () => {
		if (this.IS_LOAD) return
		this.IS_LOAD = true
		axios.defaults.params = { access_token: this.userData.access_token }
		database.initData()
	}

	@action quit = (cb) => {
		window.localStorage.clear(this.storeName)
		cb && cb()
	}

	@computed get access_token() {
		return this.userData.access_token
	}

	@computed get userPermissions() {
		return this.userData.info ? toJS(this.userData.info.user.permissions) : []
	}

}

const store = new Store()

export default store
