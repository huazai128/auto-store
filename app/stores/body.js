import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx'

useStrict(true)
class Store {
	@observable activeTag = []

	@action remove = (key, push, only) => {
		if (this.activeTag.length == 1) return

		const index = this.activeTag.map(i => i.pathname).indexOf(key)
		this.activeTag = this.activeTag.filter(i => i.pathname !== key)

		const isNull = this.activeTag.length === 0

		if (only) return

		if (isNull) return push('/')
		if (index !== 0 && !isNull) return push(this.activeTag[index - 1].pathname)
		if (index === 0 && !isNull) return push(this.activeTag[0].pathname)
	}

	@action add = (tag) => {
		const { pathname } = tag
		const keys = this.activeTag.map(item => item.pathname)
		if (keys.includes(pathname)) return
		this.activeTag = [...this.activeTag, tag]
	}

	@action clear = () => {
		this.activeTag.clear()
	}
}

const store = new Store()

export default store
