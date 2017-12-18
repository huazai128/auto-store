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
		};
	}

	async componentDidMount() {
		this.getData();
	}

	getData = async () => {
		this.setState({ loading: true });
		// const { data } = await get('api/suppliers/search', { query: this.query });
		const data = [
			{ name: '大毛', id: 1, number: 'test-1' },
			{ name: '大毛1', id: 2, number: 'test-1' },
			{ name: '大毛2', id: 3, number: 'test-1' },
			{ name: '大毛', id: 12, number: 'test-1' },
			{ name: '大毛1', id: 22, number: 'test-1' },
			{ name: '大毛2', id: 33, number: 'test-1' },
			{ name: '大毛', id: 14, number: 'test-1' },
			{ name: '大毛1', id: 25, number: 'test-1' },
			{ name: '大毛2', id: 37, number: 'test-1' },
			{ name: '大毛', id: 18, number: 'test-1' },
			{ name: '大毛1', id: 29, number: 'test-1' },
			{ name: '大毛2', id: 30, number: 'test-1' },
			{ name: '大毛', id: 184, number: 'test-1' },
			{ name: '大毛1', id: 259, number: 'test-1' },
			{ name: '大毛2', id: 360, number: 'test-1' },
			{ name: '大毛', id: 178, number: 'test-1' },
			{ name: '大毛1', id: 289, number: 'test-1' },
			{ name: '大毛2', id: 390, number: 'test-1' },
		];
		this.setState({ data, loading: false });
	}

	onConfirm = () => {
		const { selectedRowKeys } = this.state;
		this.props.onChange(selectedRowKeys);
		this.props.hide();
	}

	componentWillReceiveProps(nextProps) {
		const { selectedRowKeys = [] } = nextProps;
		this.setState({
			selectedRowKeys
		});
	}

	onChange = (e) => {
		const { value } = e.target;
		this.query = value;
	}

	render() {
		const { data, selectedRowKeys } = this.state;

		const rowSelection = {
			onChange: (selectedRowKeys) => {
				this.setState({ selectedRowKeys });
			},
			selectedRowKeys
		};

		return (
			<div>
				<div className="pl15">
					<Search onSearch={() => this.getData()} onChange={this.onChange} style={{ width: 200 }} placeholder="搜索关键字..." />
					<div style={{ minHeight: 400, margin: '20px 0' }}>
						<BasicTable
							columns={this.columns}
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
