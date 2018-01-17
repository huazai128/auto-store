import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';
import axios from 'axios';
import { observer, inject } from 'mobx-react';
import viewMap from 'view/viewMap';
import { get, post, postByParam } from 'utils/request';
const FormItem = Form.Item;
const { TabPane } = Tabs;
import Qs from 'qs';


@inject('user')
@Form.create()
export default class Login extends Component {
	state = {
		count: 0,
		type: 'account',
		submitting: false,
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	onSwitch = (type) => {
		this.setState({ type });
	}

	onGetCaptcha = () => {
		let count = 59;
		this.setState({ count });
		this.interval = setInterval(() => {
			count -= 1;
			this.setState({ count });
			if (count === 0) {
				clearInterval(this.interval);
			}
		}, 1000);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields({ force: true },
			async (err, values) => {
				if (!err) {
					const { username, password } = values;
					this.setState({ submitting: true, err: false });
					try {
						const { data } = await axios({
							method: 'post',
							baseURL: '/',
							url: '/oauth',
							data: values,
							transformRequest: [function (data) {
								data = Qs.stringify(data);
								return data;
							}],
						});
						if (!data.access_token) throw new Error('error');
						this.props.user.setUserData(data);
						this.props.history.push(viewMap[0].url);
					} catch (error) {
						this.setState({ submitting: false, err: true });
					}
				}
			}
		);
	}

	renderMessage = (message) => {
		return (
			<Alert
				style={{ marginBottom: 24 }}
				message={message}
				type="error"
				showIcon
				closable
			/>
		);
	}

	render() {
		const { form, login = {} } = this.props;
		const { getFieldDecorator } = form;
		const { count, type } = this.state;
		return (
			<div className={styles.wrap}>
				<div className={styles.container}>
					<div className={styles.main}>
						{this.state.err && this.renderMessage('账户或密码错误')}
						<Form onSubmit={this.handleSubmit}>
							<FormItem>
								{getFieldDecorator('username', {
									rules: [{
										required: type === 'account', message: '请输入账户名！',
									}],
								})(
									<Input
										size="large"
										prefix={<Icon type="user" className={styles.prefixIcon} />}
										placeholder="请输入账号"
									/>
								)}
							</FormItem>
							<FormItem>
								{getFieldDecorator('password', {
									rules: [{
										required: type === 'account', message: '请输入密码！',
									}],
								})(
									<Input
										size="large"
										prefix={<Icon type="lock" className={styles.prefixIcon} />}
										type="password"
										placeholder="请输入密码"
									/>
								)}
							</FormItem>
							<FormItem className={styles.additional}>
								{getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true,
								})(
									<Checkbox className={styles.autoLogin}>记住密码</Checkbox>
								)}
								<a className={styles.forgot}>忘记密码？</a>
								<Button size="large" loading={this.state.submitting} className={styles.submit} type="primary" htmlType="submit">
									登录
								</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</div>

		);
	}
}
