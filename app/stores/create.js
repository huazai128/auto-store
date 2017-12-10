import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import viewMap from 'utils/viewMap';
import Item from '../../node_modules/.3.0.0@antd/lib/list/Item';


useStrict(true);
class Store {

	@observable Item = []

	@action onChange = (e) => {

	}

}

// const store = new Store();

export default Store;
