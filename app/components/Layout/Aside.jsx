import React, { Component } from 'react'
import { Menu, Icon, Button, Layout, Badge } from 'antd'
import viewMap from 'view/viewMap'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

@inject(stores => ({
	body: stores.body,
	user: stores.user,
	}))
@observer
export default class extends React.Component {
	store = this.props.body

	state = {
		collapsed: false,
	}

	componentWillMount() {
		const { innerWidth } = window

		if (innerWidth < 1420) {
			this.setState({
				collapsed: true,
			})
		}
	}

	onCollapse = (collapsed) => { this.setState({ collapsed }) }

	quit = () => {
		this.props.user.quit(() => {
			this.props.history.push('/login')
		})
	}

	render() {
		const { pathname } = this.props.location

		const { userPermissions } = this.props.user

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
					{viewMap.filter(i => i.icon && (userPermissions.includes(i.permissions) || userPermissions.includes('PERMISSION_ADMIN_ALL') || i.subMenu)).map((item, index) => {
						if (item.subMenu) return (
							item.subMenu.map(i => i.permissions).some(i => userPermissions.includes(i)) || userPermissions.includes('PERMISSION_ADMIN_ALL')
								?
								<SubMenu key={item.name} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
									{item.subMenu.filter(i => userPermissions.includes(i.permissions) || userPermissions.includes('PERMISSION_ADMIN_ALL')).map(i => <Menu.Item key={i.url}><Link to={i.url} >{i.name}</Link></Menu.Item>)}
								</SubMenu>
								:
								null
						)

						return (
							<Menu.Item key={item.url}>
								<Link to={item.url}>
									<Icon style={{ fontSize: 16 }} type={item.icon} /><span>{item.name}</span>
								</Link>
							</Menu.Item>
						)
					})}

					<Menu.Item key="login">
						<div onClick={this.quit}>退出</div>
					</Menu.Item>
				</Menu>
			</Sider>
		)
	}
}
