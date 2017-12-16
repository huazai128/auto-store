import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils';
import { RangePicker } from 'components/DatePicker';
import TableMain from 'components/Table';

import axios from 'axios';

useStrict(true);

export default class {
	constructor() {
		// 不设置checked的时候，默认为true
		this.columns.forEach(column => {
			if (column.checked === undefined) column.checked = true;
		});
	}

	@action handleSelection = (selectedRows) => this.selectedRows = selectedRows;

	// 单据操作
	@action handle = async ({ url }, type, ids) => {
		const { data } = await postByParam(`${url}/${type}`, { ids: ids.toString() });
		runInAction(this.getData);
		return;
	}

	// 新增
	@action create = async ({ url }, query) => {
		const { data } = await post(`${url}/create`, query);
		runInAction(this.getData);
		return;
	}

	// 编辑接口
	@action update = async ({ url }, query) => {
		const { id } = query;
		delete query.id;
		const { data } = await axios.post(`${url}/update`, query, { params: { id } });
		runInAction(this.getData);
		return;
	}

	// 选择时间段
	@action handleRangePicker = (dates) => {
		const start = dates[0] && dates[0].valueOf();
		const end = dates[1] && dates[1].valueOf();

		this.query.start = start;
		this.query.end = end;

		this.getData();
	}

	// 搜索关键字
	@action handleSearch = (value) => {
		this.query.query = value;
		this.getData();
	}

	@action getData = async ({ url }) => {
		const query = { ...this.query };

		this.tableLoading = true;
		const [{ data }, { data: count }] = await Promise.all([get(url, this.query), get(`${url}/count`, query)]);
		runInAction(() => {
			data.forEach(i => i.key = i.id);
			this.data = data;
			this.count = count;
			this.tableLoading = false;
			this.selectedRows = [];
		});
	}


	@action onChangeTable = (pagination, filters) => {
		const { current, pageSize } = pagination;

		if (Array.isArray(filters.state)) this.query.state = filters.state[0];
		this.query.from = (current - 1) * pageSize;
		this.getData();
	}

	@action onFilterTableHeader = (checkedList) => {
		this.columns.forEach(item => {
			if (checkedList.includes(item.mark)) item.checked = true;
			else item.checked = false;
		});

		this.columns = observable.shallowArray(this.columns);
	}

	getFields = (columns = []) => {
		return columns.filter(i => i.created).map(item => ({
			label: item.mark,
			key: item.key,
			...item.created
		}));
	}


	RenderMainTable = props => { return React.cloneElement(<TableMain />, { pagination: { total: this.count }, store: this, ...props }); }
	RenderRangePicker = () => React.cloneElement(<RangePicker />, { onChange: this.handleRangePicker });
}
