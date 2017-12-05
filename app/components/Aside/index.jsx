import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import viewMap from 'utils/viewMap';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const SubMenu = Menu.SubMenu;


@inject('body')
@observer
export default class extends React.Component {
	store = this.props.body

	state = {
		collapsed: false,
	}

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}

	render() {
		const { pathname } = this.props.location;

		return (
			<div>
				<Menu
					mode="inline"
					selectedKeys={[pathname]}
					inlineCollapsed={this.state.collapsed}
					onClick={this.store.add}
				>
					{viewMap.filter(i => i.icon).map((item, index) => {
						return <Menu.Item key={item.url}><Link to={item.url}><Icon style={{ fontSize: 16 }} type={item.icon} /><span>{item.name}</span></Link></Menu.Item>;
					})}
					{/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
						<Menu.Item key="5">Option 5</Menu.Item>
						<Menu.Item key="6">Option 6</Menu.Item>
					</SubMenu> */}
				</Menu>
				<Button type="primary" onClick={this.toggleCollapsed}>
					<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
				</Button>
			</div>
		);
	}
}
