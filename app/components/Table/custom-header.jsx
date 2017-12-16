import React, { Component } from 'react';
import { Table, Tag, Popover, Tooltip, Button, Checkbox } from 'antd';
import { observer, inject } from 'mobx-react';
import popover from 'hoc/popover';
import styles from './custom-header.scss';
const CheckboxGroup = Checkbox.Group;


@popover({ confirm: true })
@observer
export default class CustomHeader extends Component {
	constructor(props) {
		super(props);

		this.fixList = props.store.columns.filter(i => i.fix).map(i => ({ label: i.mark, value: i.mark }));
		this.list = props.store.columns.filter(i => !i.fix).map(i => ({ label: i.mark, value: i.mark }));
		this.state = {
			checkedList: props.store.columns.filter(item => item.checked).map(i => i.mark)
		};
	}

	onConfirm = () => {
		this.props.store.onFilterTableHeader(this.state.checkedList);
		this.props.hide();
	}

	onChange = (checkedList) => {
		this.setState({ checkedList });
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
					<div className={styles.custom}><CheckboxGroup onChange={this.onChange} options={this.list} value={this.state.checkedList} /></div>
				</div>
				<div>
					<Button type="primary" className="mr20" onClick={this.onConfirm}>确定</Button>
					<Button onClick={this.props.hide}>取消</Button>
				</div>
			</div>
		);
	}
}
