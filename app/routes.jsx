import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Tabs } from 'antd';
import viewMap from 'utils/viewMap';
import asyncComponent from 'app/hoc/asyncComponent';
import { Aside } from 'components/Layout';
import { observer, inject } from 'mobx-react';

const TabPane = Tabs.TabPane;

@observer
class TabPanes extends Component {
	render() {
		const { history, location, store } = this.props;
		return (
			<Tabs style={{ height: '100%' }} key="tags" className="main-tags" onEdit={key => store.remove(key, history.push)} activeKey={location.pathname} onChange={key => history.push(key)} type="card">
				{store.activeTag.map(tag => {
					const { Component } = tag;
					return (
						<TabPane tab={<div onDoubleClick={() => store.remove(tag.pathname, history.push)}>{tag.name}</div>} key={tag.pathname}>
							{Component ? <Component {...tag} /> : <div>1233</div>}
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

@inject('body')
@observer
export default class extends Component {
	componentDidMount() {
		const { pathname } = this.props.location;
		if (pathname === '/') this.props.history.push(viewMap[0].url);
	}

	render() {
		return (
			<div style={{ height: '100%', overflow: 'hidden' }} className="flex">
				<Aside {...this.props} />
				<div className="flex-g-1 flex-col">
					<TabPanes store={this.props.body} {...this.props} />
				</div>
				{/* router ==> body{tags: []} */}
				<Switch key="Switch">
					{viewMap.map(item => (
						<Route exact key={item.url} path={item.url} render={props => {
							const { pathname } = props.location;
							return (
								<GetTag store={this.props.body} tag={{ ...item, pathname }} {...props} />
							);
						}} />
					))}
				</Switch>
			</div>
		);
	}
}

