import React, { Component } from 'react';
import { Table, Tag, Tooltip, Icon } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer } from 'mobx-react';
import { getXSrcoll, computeColumns } from './utils';

/* columns[]: { width: 100, title: '姓名', key: 'name', } */

@observer
export default class extends Component {
	static defaultProps = {
		columns: [{ width: 100, title: '姓名', key: 'name', }],
		dataSource: [],
	}

	constructor(props) {
		super(props);
		this.columns = computeColumns(props.columns);
	}


	render() {
		const { dataSource, columns, min, ...reset } = this.props;

		dataSource.forEach(i => i.key = i.id);

		return (
			<Table
				scroll={{ x: getXSrcoll(this.columns), ...this.props.scroll }}
				className={`${min ? 'two-row' : ''} main-table`}
				size="middle"
				columns={this.columns}
				dataSource={dataSource}
				{...reset}
			/>
		);
	}
}


