import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import viewMap from 'utils/viewMap';


useStrict(true);
class Store {

	@observable count = 0

	@action countUp = () => {
		this.count = this.count + 1;
	}

	@action submit = async (tag) => {
		const data = await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});

		return data;
	}

}

// const store = new Store();

export default Store;
