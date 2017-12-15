import React, { Component } from 'react';
import { Table, Tag, Tooltip, Icon } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
import { observer } from 'mobx-react';

@observer
export default class extends Component {
	static defaultProps = {
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

	renderTitle = (file) => {
		if (!file || !file.response.data) return null;

		const { success = [], fail = [] } = file.response.data;

		return (
			<section style={{ lineHeight: 1.8 }}>
				<div className="flex-vcenter">
					<Icon className="fs14 mr5" type="file-text" /><strong className="mr10">{file.name}</strong>
					<p>可导入<span style={{ color: '#108ee9' }}>{success.length}</span>个款号</p>, 其中<span style={{ color: '#f04134' }}>{fail ? fail.length : 0}</span>个款号不可导入
				</div>
				{fail && fail.length > 0 && <div className="flex">
					<div style={{ color: '#f04134' }}>不可导入款号：</div>
					<div className="flex">
						<p>...</p>
					</div>
				</div>}
			</section>
		);
	}

	render() {
		const { dataSource, file } = this.props;

		dataSource.forEach(i => i.key = i.id);

		return (
			<Table
				size="small"
				bordered
				scroll={{ x: this.getXSrcoll(this.columns), y: 600 }}
				dataSource={dataSource}
				title={() => this.renderTitle(file)}
				columns={this.columns}
			/>
		);
	}
}
