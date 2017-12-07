import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import viewMap from 'utils/viewMap';


useStrict(true);
class Store {

	@action submit = async (tag) => {
		const data = await new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});

		return data;
	}

}

const store = new Store();

export default store;
