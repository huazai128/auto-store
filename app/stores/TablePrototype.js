import React, { Component } from 'react';
import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { get, post, postByParam } from 'utils';
import { RangePicker } from 'components/DatePicker';
import TableMain from 'components/Table';
import HandleButtonOrigin from 'components/Button';
import moment from 'moment';
import axios from 'axios';
import BindedPopover from 'components/Select/comprehensive-binded-popover';


useStrict(true);

export default class {
	constructor() {
		// 不设置checked和fix的时候，默认为true
		this.columns.forEach(column => {
			if (column.checked === undefined && !column.fix) column.checked = true;
		});
	}

	@action initQuery = () => {
		this.query = {
			supplierIds: [],
			warehouseIds: [],
			toWarehouseIds: [],
			fromWarehouseIds: [],
		};
	}

	@action init = () => {
		this.initQuery();
		this.getData();
	}

	@action handleSelection = (selectedRows) => this.selectedRows = selectedRows;

	// @action onRowClick = (record) => {
	// 	const { key } = record;
	// 	if (this.selectedRows.map(i => i.key).includes(key)) {
	// 		this.selectedRows = this.selectedRows.filter(item => item.key !== key);
	// 	} else {
	// 		this.selectedRows = [...this.selectedRows, record];
	// 	}
	// }

	@action onRowDoubleClick = (record, push) => {
		const { state, id } = record;
		if (state !== 'created') return;
		if (!this.detailPathname) return;

		push(`${this.detailPathname}/${id}`);
	}

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
		this.query.start = dates[0];
		this.query.end = dates[1];
		this.getData();
	}

	// 搜索关键字
	@action handleSearchChange = (value) => {
		this.query.query = value;
		this.getData();
	}

	@action getData = async ({ url }) => {

		const query = toJS(this.query);

		for (const key in query) {
			if (moment.isMoment(query[key])) query[key] = moment(query[key]).valueOf();
			if (Array.isArray(query[key]) && query[key].length == 0) {
				delete query[key];
			} else if (Array.isArray(query[key])) query[key] = query[key].toString();
		}

		this.tableLoading = true;

		const [{ data }, { data: count }] = await Promise.all([get(url, query), get(`${url}/count`, query)]);
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

	@action onChangeSupplier = (selectedRowKeys) => {
		this.query.supplierIds = selectedRowKeys;
		this.getData();
	}

	@action onChangeWarehouse = (selectedRowKeys) => {
		this.query.warehouseIds = selectedRowKeys;
		this.getData();
	}

	@action onChangeToWarehouse = (selectedRowKeys) => {
		this.query.toWarehouseIds = selectedRowKeys;
		this.getData();
	}

	@action onChangeFromWarehouse = (selectedRowKeys) => {
		this.query.fromWarehouseIds = selectedRowKeys;
		this.getData();
	}

	getFields = (columns = []) => {
		return columns.filter(i => i.created).map(item => ({
			label: item.mark,
			key: item.key,
			...item.created
		}));
	}

	RenderMainTable = props => { return React.cloneElement(<TableMain />, { store: this, ...props }); }
	// RenderRangePicker = () => React.cloneElement(<RangePicker />, {
	// 	onChange: this.handleRangePicker,
	// });

	RenderRangePicker = () => (
		<div className="flex-vcenter ml50">
			查询日期：<RangePicker onChange={this.handleRangePicker} />
		</div>
	)

	HandleButton = ({ children, ...reset }) => React.cloneElement(<HandleButtonOrigin>{children}</HandleButtonOrigin>, { store: this, ...reset });
	DeleteButton = ({ children, ...reset }) => <this.HandleButton method="delete" state="created" className="ml20" type="danger" confirm {...reset}>{children}</this.HandleButton>

	RenderSupplierPopover = (props) => React.cloneElement(<BindedPopover />, {
		store: this,
		type: 'supplier',
		...props
	});

	RenderWarehousePopover = (props) => React.cloneElement(<BindedPopover />, {
		store: this,
		type: 'warehouse',
		...props
	});

	RenderToWarehousePopover = (props) => React.cloneElement(<BindedPopover />, {
		store: this,
		type: 'toWarehouse',
		...props
	});

	RenderFromWarehousePopover = (props) => React.cloneElement(<BindedPopover />, {
		store: this,
		type: 'fromWarehouse',
		...props
	});
}
