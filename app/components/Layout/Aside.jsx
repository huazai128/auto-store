import React, { Component } from 'react';
import { Menu, Icon, Button, Layout } from 'antd';
import viewMap from 'view/viewMap';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

@inject('body')
@observer
export default class extends React.Component {
	store = this.props.body

	state = {
		collapsed: true,
	}

	onCollapse = (collapsed) => { this.setState({ collapsed }); }

	render() {
		const { pathname } = this.props.location;

		return (
			<Sider
				width={180}
				collapsible
				collapsed={this.state.collapsed}
				onCollapse={this.onCollapse}
			>
				<Menu
					mode="inline"
					theme="dark"
					selectedKeys={[pathname]}
					inlineCollapsed={this.state.collapsed}
				>
					{viewMap.filter(i => i.icon).map((item, index) => {
						return <Menu.Item key={item.url}><Link to={item.url}><Icon style={{ fontSize: 16 }} type={item.icon} /><span>{item.name}</span></Link></Menu.Item>;
					})}
					{/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
						<Menu.Item key="5">Option 5</Menu.Item>
						<Menu.Item key="6">Option 6</Menu.Item>
					</SubMenu> */}
				</Menu>
			</Sider>
		);
	}
}
