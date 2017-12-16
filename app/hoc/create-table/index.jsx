import React, { Component } from 'react';
import Table from 'components/Table/CreateTable';
import { Form, Modal } from 'antd';
import CreateFormItem from 'components/Form/CreateFormItem';
import { observer, inject } from 'mobx-react';
import Upload from 'components/Upload';
import { filterRepeat } from 'utils';
import moment from 'moment';
import { get, post, postByParam } from 'utils';

@Form.create()
export default (options = {}) => WrappedComponent => {
	const { url } = options;

	return class extends React.Component {

		constructor(props) {
			super(props);

			this.id = this.props.params.id;

			const { getFieldDecorator } = props.form;
			this.BindedFormItem = ({ children, ...reset }) => React.cloneElement(<CreateFormItem>{children}</CreateFormItem>, { getFieldDecorator, ...reset });
			this.RenderUpload = ({ children, ...reset }) => React.cloneElement(<Upload>{children}</Upload>, {
				handleConfirm: this.addItems,
				url,
				...reset
			});

			this.RenderCreateTable = (props) => React.cloneElement(<Table />, {
				deleteItem: this.deleteItem,
				handleIpuntChange: this.handleIpuntChange,
				items: this.state.items,
				...props
			});

			this.state = {
				items: [
					{
						id: 2,
						skuId: 2,
						name: '瞄99',
						number: 'test-sku-003',
						amount: 3
					},
				]
			};
		}

		componentDidMount() {
			if (this.id) {
				this.props.form.setFieldsValue({
					sequence: 'test-10086',
				});
			}
		}

		addItems = (newItems = []) => {
			const data = filterRepeat([...this.state.items, ...newItems], 'id');
			this.setState({
				items: data,
			});
		}



		handleSubmit = async (pass) => {
			return await new Promise((reslove, reject) => {
				this.props.form.validateFields(async (err, values) => {
					if (!err) {
						for (const key in values) {
							if (values[key] && values[key].constructor.name == 'Moment') values[key] = moment(values[key]).valueOf();
						}

						if (this.state.items.length == 0) return reject(Modal.error({
							title: '货品数据不能为空'
						}));

						const result = {
							...values,
							items: this.state.items,
						};

						pass(result);

						try {
							reslove(await this.create(result));
						} catch (err) {
							reject();
						}
					} else reject();
				});
			});
		}

		getData = async (id) => await get(`${url}/detail`, { id });

		create = async (query) => await post(`${url}/create`, query);

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
					handleSubmit={this.handleSubmit}
					addItems={this.addItems}
					create={this.create}
					RenderUpload={this.RenderUpload}
					BindedFormItem={this.BindedFormItem}
					RenderCreateTable={this.RenderCreateTable}
				/>
			);
		}
	};
};
