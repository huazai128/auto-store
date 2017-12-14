import React from 'React';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import CreateTable from 'components/Table/CreateTable';


useStrict(true);
class Store {

	constructor(url = '') {
		this.url = url;
		console.log(this.url);
	}

	@observable items = [
		{ key: '1', number: 'test-10086', count: 100, contdsd: '123' },
		{ key: '234', number: 'test-10086', count: 100, contdsd: '123312' },
		{ key: '14', number: 'test-10086', count: 100, contdsd: '123' },
		{ key: '25', number: 'test-10086', count: 100, contdsd: '123312' },
		{ key: '16', number: 'test-10086', count: 100, contdsd: '123' },
	]

	@action addItems = (newItems = []) => {
		this.items = [...this.items, ...newItems];
	}

	@action handleIpuntChange = (field, record, e) => {
		let type = 'text';
		if (typeof e !== 'object') type = 'number';

		const target = this.items.find(i => i.key == record.key);
		target[field] = type == 'number' ? e : e.target.value;

		if (type == 'number' && !target[field]) {
			target[field] = 1;
		}

		this.items = observable.shallowArray(this.items);
	}

	@action deleteItem = (record) => {
		this.items = this.items.filter(i => i.key !== record.key);
		// this.items = observable.shallowArray(this.items);
	}

	RenderCreateTable = props => React.cloneElement(<CreateTable />,
		{
			handleIpuntChange: this.handleIpuntChange,
			deleteItem: this.deleteItem,
			addItems: this.addItems,
			...props
		}
	);

}

export default Store;
