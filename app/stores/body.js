import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import viewMap from 'utils/viewMap';


useStrict(true);
class Store {
	@observable activeTag = []

	@action remove = (key, push) => {
		const index = this.activeTag.indexOf(key);
		this.activeTag = this.activeTag.filter(i => i !== key);

		const isNull = this.activeTag.length === 0;
		if (isNull) return push('/');
		if (index !== 0 && !isNull) return push(this.activeTag[index - 1].url);
		if (index === 0 && !isNull) return push(this.activeTag[0].url);
	}

	@action add = (tag) => {
		const { pathname } = tag;
		const keys = this.activeTag.map(item => item.pathname);
		if (keys.includes(pathname)) return;
		// // this.activeTag.push(tag);
		this.activeTag = [...this.activeTag, tag];
	}

	@action init = key => {
		this.activeTag.push(key);
		this.activeTag = observable.shallowArray(this.activeTag);
	}
}

const store = new Store();

export default store;
