import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils';

useStrict(true);
class Store {
	constructor() {
		this.getReturnTypes('/api/types/returnTypes');
	}

	@observable returnTypes = []

	@action getReturnTypes = async (url) => {
		const { data } = await get(url);
		runInAction(() => {
			this.returnTypes = data;
		});
	}
}

const store = new Store();

export default store;
