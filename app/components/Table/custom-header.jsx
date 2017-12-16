import React, { Component } from 'react';
import { Table, Tag, Popover, Tooltip, Button, Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import popover from 'hoc/popover';
import styles from './custom-header.scss';
const CheckboxGroup = Checkbox.Group;


@popover()
@observer
export default class CustomHeader extends Component {
	constructor(props) {
		super(props);

		this.fixList = props.store.columns.filter(i => i.fix).map(i => ({ label: i.mark, value: i.mark }));

		this.list = props.store.columns.filter(i => !i.fix).map(i => ({ label: i.mark, value: i.mark }));
		this.checkedList = props.store.columns.filter(i => i.checked).map(i => ({ label: i.mark, value: i.mark }));

		this.state = {
			checkedList: this.checkedList.map(i => i.value),
			indeterminate: !!this.checkedList.length && (this.checkedList.length < this.list.length),
			checkAll: this.checkedList.length === this.list.length,
		};
	}

	onConfirm = () => {
		this.props.store.onFilterTableHeader(this.state.checkedList);
		this.props.hide();
	}

	onChange = (checkedList) => {
		this.setState({
			checkedList,
			indeterminate: !!checkedList.length && (checkedList.length < this.list.length),
			checkAll: checkedList.length === this.list.length,
		});
	}

	onCheckAllChange = (e) => {
		this.setState({
			checkedList: e.target.checked ? this.list.map(i => i.value) : [],
			indeterminate: false,
			checkAll: e.target.checked,
		});
	}

	render() {

		return (
			<div className={styles.wrap}>
				<div className="flex mb10" style={{ borderBottom: '1px solid #E9E9E9' }}>
					<strong style={{ width: 110 }}>固定列表展示：</strong>
					<div className={styles.fix}><CheckboxGroup disabled options={this.fixList} value={this.fixList.map(i => i.value)} /></div>
				</div>
				<div className="flex mb10">
					<strong style={{ width: 110 }}>自定义列表展示：</strong>
					<div className={styles.custom}>
						<div>
							<Checkbox
								indeterminate={this.state.indeterminate}
								onChange={this.onCheckAllChange}
								checked={this.state.checkAll}
							>
								全选
							</Checkbox>
						</div>
						<CheckboxGroup onChange={this.onChange} options={this.list} value={this.state.checkedList} />
					</div>
				</div>
				<div className="pl15">
					<Button type="primary" className="mr20" onClick={this.onConfirm}>确定</Button>
					<Button onClick={this.props.hide}>取消</Button>
				</div>
			</div>
		);
	}
}
