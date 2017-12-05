import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import viewMap from 'utils/viewMap';
import asyncComponent from 'app/hoc/asyncComponent';
import Aside from 'components/Aside';
import { observer, inject } from 'mobx-react';

const TabPane = Tabs.TabPane;


const TabPanes = withRouter(({ history, location, activeTagString, remove }) => (
	<Tabs style={{height: '100%'}} onEdit={key => remove(key, history.push)} activeKey={location.pathname} onChange={key => history.push(key)} type="card">
		{activeTagString.map(item => {
			const view = viewMap.find(i => i.url == item);
			return (
				<TabPane tab={<div onDoubleClick={() => remove(view.url, history.push)}>{view.name}</div>} key={view.url}>
					<Route exact path={view.url} render={props => {
						const { Component } = view;
						if (Component) return <Component headerTitle={view.name} {...props} />;
						else return <h2>Welcome to {view.name}</h2>;
					}} />
				</TabPane>
			);
		})}
	</Tabs>
));

@inject('body')
@observer
export default class extends Component {
	componentDidMount() {
		if (this.props.location.pathname !== '/') this.props.body.init(this.props.location.pathname);
	}

	render() {
		const { activeTagString, remove } = this.props.body;

		return (
			<div style={{ height: '100%', overflow: 'hidden' }} className="flex">
				<Aside {...this.props} />
				<div className="flex-g-1">
					<Switch>
						<TabPanes activeTagString={activeTagString} remove={remove} />
					</Switch>
				</div>
			</div>
		);
	}
}
