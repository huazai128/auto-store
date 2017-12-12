import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';


useStrict(true);
class Store {

	@observable item = []

	@action onChange = (e) => {

	}

}

// const store = new Store();

export default Store;
