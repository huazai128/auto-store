import React, { Component } from 'react';
import { Table, Button, Input } from 'antd';
import { observer, inject } from 'mobx-react';
import popover from 'hoc/popover';
import { get } from 'utils';

import BasicTable from 'components/Table/Basic';

const { Search } = Input;

@popover()
@observer
export default class extends Component {
	static defaultProps = {
		api: 'api/suppliers/search',
	}

	constructor(props) {
		super(props);

		this.columns = [
			{ width: 300, title: '姓名', key: 'name', },
			{ width: 300, title: '编号', key: 'number', },
		];

		this.state = {
			data: [],
			loading: false,
			selectedRowKeys: props.selectedRowKeys || [],
			selectedRows: [],
		};
	}

	componentDidMount() {
		this.getData();
	}

	componentWillReceiveProps(nextProps) {
		const { selectedRowKeys = [] } = nextProps;
		this.setState({
			selectedRowKeys
		});
	}

	getData = async () => {
		this.setState({ loading: true });
		const { data } = await get(this.props.api, { query: this.query });
		this.setState({ data, loading: false });
	}

	onConfirm = () => {
		const { selectedRowKeys, selectedRows } = this.state;
		this.props.onChange(selectedRowKeys, selectedRows);
		this.props.hide();
	}

	onChange = (e) => {
		const { value } = e.target;
		this.query = value;
	}

	onRowClick = (record) => {
		const { key } = record;
		const { selectedRowKeys } = this.state;

		if (this.props.radio) {
			if (key == this.props.disabledId) return;

			this.setState({
				selectedRowKeys: [key],
				selectedRows: [record]
			});
			return;
		}

		if (selectedRowKeys.includes(key)) {
			this.setState({
				selectedRowKeys: selectedRowKeys.filter(item => item !== key)
			});
		} else {
			this.setState({
				selectedRowKeys: [...selectedRowKeys, key]
			});
		}
	}

	render() {
		const { data, selectedRowKeys } = this.state;

		const rowSelection = {
			type: this.props.radio ? 'radio' : 'checkbox',
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({ selectedRowKeys, selectedRows });
			},
			selectedRowKeys,
			getCheckboxProps: record => {
				return ({
					disabled: record.id === this.props.disabledId, // Column configuration not to be checked
				});
			}
		};

		return (
			<div>
				<div className="pl15">
					<Search onSearch={() => this.getData()} onChange={this.onChange} style={{ width: 200 }} placeholder="搜索关键字..." />
					<div style={{ minHeight: 400, margin: '20px 0' }}>
						<BasicTable
							columns={this.columns}
							onRow={(record, index) => ({
								onClick: this.onRowClick.bind(this, record, index)
							})}
							rowSelection={rowSelection}
							scroll={{ y: 400 }}
							pagination={false}
							loading={this.state.loading}
							dataSource={data} />
					</div>
					<Button type="primary" className="mr20" onClick={this.onConfirm}>确定</Button>
					<Button onClick={this.props.hide}>取消</Button>
				</div>
			</div >
		);
	}
}
