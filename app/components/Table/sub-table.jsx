import React, { Component } from 'react';
import { Table, Tag, Tooltip } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer } from 'mobx-react';

/**
|--------------------------------------------------
| export default class table
| main modules
|--------------------------------------------------
*/
@observer
export default class extends Component {
	static defaultProps = {
		loading: false,
		store: {},
		columns: [],
		dataSource: [],
	}

	constructor(props) {
		super(props);

		this.columns = props.columns.map(item => {
			return {
				...item,
				dataIndex: item.key,
				className: 'text-overflow',
				render: item.render ? item.render : (text, record) => {
					if (item.type == 'date') return text && moment(text).format('YYYY.MM.DD');

					return <Tooltip placement="topLeft" title={text}>{text}</Tooltip>;
				}
			};
		});
	}

	getXSrcoll(columns = []) {
		let x = 0;
		columns.forEach(item => x += item.width);
		return x;
	}

	render() {
		const { dataSource } = this.props;

		return (
			<Table
				className='main-table'
				size="small"
				scroll={{ x: this.getXSrcoll(this.columns), y: 300 }}
				dataSource={dataSource}
				pagination={false}
				title={() => 'assd'}
				columns={this.columns}
			/>
		);
	}
}
