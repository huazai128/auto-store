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
		};
	}

	async componentDidMount() {
		this.getData();
	}

	getData = async () => {
		this.setState({ loading: true });
		const { data } = await get('api/suppliers/search', { query: this.query });
		this.setState({ data, loading: false });
	}

	onConfirm = () => {
		this.props.hide();
	}

	onChange = (e) => {
		const { value } = e.target;
		this.query = value;
	}



	render() {
		const { data } = this.state;

		return (
			<div>
				<div className="pl15">
					<Search onSearch={() => this.getData()} onChange={this.onChange} style={{ width: 200 }} placeholder="搜索关键字..." />
					<div style={{ minHeight: 400, margin: '20px 0' }}>
						<BasicTable
							columns={this.columns}
							rowSelection={{}}
							loading={this.state.loading}
							dataSource={data} />
					</div>
					<Button type="primary" className="mr20" onClick={this.onConfirm}>确定</Button>
					<Button onClick={this.props.hide}>取消</Button>
				</div>
			</div>
		);
	}
}
