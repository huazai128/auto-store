import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Tabs, Layout } from 'antd';
import viewMap from 'utils/viewMap';
import asyncComponent from 'app/hoc/asyncComponent';
import Aside from 'components/Aside';
import { observer, inject } from 'mobx-react';

const TabPane = Tabs.TabPane;
const { Content } = Layout;

{/* <Switch key="Switch">
	{viewMap.map(item => (
		<Route exact key={item.url} path={item.url} render={props => {
			const { Component } = item;
			if (Component) return <Component headerTitle={item.name} {...props} />;
			else return <h2>Welcome to {item.name}</h2>;
		}} />
	))}
</Switch> */}
// @withRouter
@observer
class TabPanes extends Component {
	render() {
		const { history, location, store } = this.props;
		return (
			<Tabs key="tags" className="main-tags" onEdit={key => store.remove(key, history.push)} activeKey={location.pathname} onChange={key => history.push(key)} type="card">
				{store.activeTag.map(item => {
					const { Component } = item;
					return (
						<TabPane tab={<div onDoubleClick={() => store.remove(item.url, history.push)}>{item.name}</div>} key={item.pathname}><Component /></TabPane>
					);
				})}
			</Tabs>
		);
	}
}


@inject('body')
@observer
export default class extends Component {
	componentWillReceiveProps(nextProps) {
		// const { pathname, url } = nextProps.location;
		// this.props.body.add(pathname);
		// console.log(nextProps);
	}

	// componentDidMount() {
	// 	if (this.props.location.pathname !== '/') this.props.body.init(this.props.location.pathname);
	// }


	render() {
		return (
			<div style={{ height: '100%', overflow: 'hidden' }} className="flex">
				<Aside {...this.props} />
				<div className="flex-g-1 flex-col">
					<TabPanes store={this.props.body} {...this.props} />
				</div>
				<Switch key="Switch">
					{viewMap.map(item => (
						<Route exact key={item.url} path={item.url} render={props => {
							const { pathname } = props.location;
							item.Component = item.Component ? item.Component : () => <div></div>;
							this.props.body.add({ ...item, Component: item.Component ? item.Component : () => <div></div>, pathname });
							return null;
						}} />
					))}
				</Switch>
			</div>
		);
	}
}

