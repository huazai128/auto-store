import { observable, computed, useStrict, action, runInAction, autorun } from 'mobx';
import { getApi, postApi } from 'utils';


useStrict(true);
class Store {
	@observable activeTagString = []

	@action remove = (key, push) => {
		const index = this.activeTagString.indexOf(key);
		this.activeTagString = this.activeTagString.filter(i => i !== key);

		const isNull = this.activeTagString.length === 0;
		if (isNull) return push('/');
		if (index !== 0 && !isNull) return push(this.activeTagString[index - 1]);
		if (index === 0 && !isNull) return push(this.activeTagString[0]);
	}

	@action add = ({ key }) => {
		if (this.activeTagString.includes(key)) return;
		this.activeTagString.push(key);
	}

	@action init = key => {
		this.activeTagString.push(key);
		this.activeTagString = observable.shallowArray(this.activeTagString);
	}
}

const store = new Store();

export default store;
