import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils';
import { RangePicker } from 'components/DatePicker';

import axios from 'axios';

useStrict(true);

class Store {
	@action handleSelection = (selectedRows) => this.selectedRows = selectedRows;

	@action handle = async ({ url }, type, ids) => {
		const { data } = await postByParam(`${url}/${type}`, { ids: ids.toString() });
		runInAction(this.getData);
		return;
	}

	@action create = async ({ url }, query) => {
		const { data } = await post(`${url}/create`, query);
		runInAction(this.getData);
		return;
	}

	@action update = async ({ url }, query) => {
		const { id } = query;
		delete query.id;
		const { data } = await axios.post(`${url}/update`, query, { params: { id } });
		runInAction(this.getData);
		return;
	}

	@action handleRangePicker = (dates) => {
		const start = dates[0] && dates [0].valueOf();
		const end = dates[1] && dates [1].valueOf();

		this.query.start = start;
		this.query.end = end;

		this.getData();
	}

	@action handleSearch = (value) => {
		this.query.query = value;
		this.getData();
	}

	@action getData = () => {
		console.log(this.query);
	}

	getFields = (columns = []) => {
		return columns.filter(i => i.created).map(item => ({
			label: item.mark,
			key: item.key,
			...item.created
		}));
	}

	RenderRangePicker = () => React.cloneElement(<RangePicker />, { onChange: this.handleRangePicker });

	// @action create = async (query) => {
	// 	const { data } = await post('/api/skus/create', query);
	// 	runInAction(this.getData);
	// 	return;
	// }

	// @action update = async (query) => {
	// 	const { id } = query;
	// 	delete query.id;
	// 	const { data } = await axios.post('/api/skus/update', query, { params: { id } });
	// 	runInAction(this.getData);
	// 	return;
	// }

	// @action handle = async (type, ids) => {
	// 	const { data } = await postByParam(`/api/skus/${type}`, { ids: ids.toString() });
	// 	runInAction(this.getData);
	// 	return;
	// }

	// @computed get dataSource() { return toJS(this.data); }

	// @computed get fields() {
	// 	return this.columns
	// 		.filter(i => i.created)
	// 		.map(item => ({
	// 			label: item.mark,
	// 			key: item.key,
	// 			...item.created
	// 		}));
	// }
}

export default Store;
