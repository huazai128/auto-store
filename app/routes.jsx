import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Tabs } from 'antd';
import viewMap from 'view/viewMap';
import asyncComponent from 'app/hoc/asyncComponent';
import { Aside } from 'components/Layout';
import { observer, inject } from 'mobx-react';

import Login from 'view/User/Login';
const TabPane = Tabs.TabPane;

@observer
class TabPanes extends Component {
	render() {
		const { history, location, store } = this.props;
		return (
			<Tabs
				type="editable-card"
				hideAdd
				style={{ height: '100%' }}
				key="tags"
				className="main-tags"
				onEdit={key => store.remove(key, history.push)}
				activeKey={location.pathname}
				onChange={key => history.push(key)}
			>
				{store.activeTag.map(tag => {
					const { Component } = tag;

					// tag.close = store.remove.bind(this, tag.pathname, history.push);
					return (
						<TabPane tab={<span onDoubleClick={() => store.remove(tag.pathname, history.push)}>{tag.name}</span>} key={tag.pathname}>
							{/* {Component ? <Component activeKey={location.pathname} push={history.push} {...tag} /> : <div>content...</div>} */}
							{Component ? <Component push={history.push} {...tag} /> : <div>content...</div>}
						</TabPane>
					);
				})}
			</Tabs>
		);
	}
}

class GetTag extends Component {
	componentDidMount() {
		this.props.store.add(this.props.tag);
	}
	render() {
		return null;
	}
}

@inject(stores => ({
	body: stores.body,
	user: stores.user
	}))
@observer
export default class extends Component {
	componentDidMount() {
		const { pathname } = this.props.location;
		this.check(pathname);
	}
	componentWillReceiveProps(nextProps) {
		const { pathname } = nextProps.location;
		this.check(pathname);
	}
	check = (pathname) => {
		if (pathname === '/') this.props.history.push(viewMap[0].url);
		if (!this.props.user.init() && pathname !== '/login') this.props.history.push('/login');
	}

	render() {
		const { pathname } = this.props.location;

		return (
			<div style={{ height: '100%', }}>
				{pathname !== '/login' && <div style={{ height: '100%', }} className="flex">
					<Aside {...this.props} />
					<div style={{ overflow: 'auto' }} className="flex-g-1 flex-col">
						<TabPanes store={this.props.body} {...this.props} />
					</div>
				</div>}
				{/* router ==> body{tags: []} */}
				<Switch key="Switch">
					<Route exact path="/login" component={Login} />
					{viewMap.map(item => (
						<Route exact key={item.url} path={item.url} render={props => {
							const { pathname } = props.location;
							const { params } = props.match;
							return (
								<GetTag store={this.props.body} tag={{ ...item, pathname, params }} {...props} />
							);
						}} />
					))}
				</Switch>
			</div>
		);
	}
}
