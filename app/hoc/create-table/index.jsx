import React, { Component } from 'react';
import Table from 'components/Table/CreateTable';
import { Form } from 'antd';
import CreateFormItem from 'components/Form/CreateFormItem';
import { observer, inject } from 'mobx-react';

@Form.create()
export default (options = {}) => WrappedComponent => {
	const { url } = options;

	return class extends React.Component {

		constructor(props) {
			super(props);

			const { getFieldDecorator } = props.form;
			this.BindedFormItem = ({ children, ...reset }) => React.cloneElement(<CreateFormItem>{children}</CreateFormItem>, { getFieldDecorator, ...reset });

			this.RenderCreateTable = (props) => React.cloneElement(<Table />, {
				deleteItem: this.deleteItem,
				handleIpuntChange: this.handleIpuntChange,
				items: this.state.items,
				...props
			});

			this.state = {
				items: [
					{ number: 100, count: 100, contdsd: 'dasd', key: 11 }
				]
			};
		}

		componentDidMount() {

		}

		addItems = (newItems = [{ number: 100, count: 100, contdsd: 'dasd', key: Math.random() }]) => {

			console.log(newItems);
			this.setState({
				items: [...this.state.items, ...newItems],
			});
		}

		handleIpuntChange = (field, record, e) => {
			const { items } = this.state;
			record[field] = typeof e !== 'object' ? e : e.target.value;
			this.setState({ items });
		}

		deleteItem = (record) => {
			this.setState({
				items: this.state.items.filter(i => i !== record)
			});
		}

		render() {
			return (
				<WrappedComponent
					{...this.props}
					{...this.state}
					addItems={this.addItems}
					BindedFormItem={this.BindedFormItem}
					RenderCreateTable={this.RenderCreateTable}
				/>
			);
		}
	};
};
