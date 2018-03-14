import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Checkbox, Row, Col, Switch, Tag, message } from 'antd'
import styles from './WorkContent.less'
import { toJS } from 'mobx'
import { limitSwitch } from 'components/Limit'

const CheckboxGroup = Checkbox.Group

@inject('settings')
@observer
export default class extends Component {

	onSwitch = (item, checked) => {
		if (!limitSwitch('PERMISSION_UPDATE_ROLE')) return message.warn('当前用户无权修改权限!')

		const { record } = this.props.settings
		const permissionsData = this.props.settings.permissionsMap.find(item => item.id == record.groupId) || {}
		const { permissions } = permissionsData

		const childrenPermissions = permissions.find(permission => permission.id == item.id) ? permissions.find(permission => permission.id == item.id).childs.map(i => i.id) : []

		const rowPermissions = [item.id, ...childrenPermissions]

		let assetPermissions = []

		if (checked) {
			assetPermissions = [...new Set([...record.permissions, ...rowPermissions])]
		} else {
			assetPermissions = record.permissions.filter(i => !rowPermissions.includes(i))
		}

		this.props.settings.update(assetPermissions)
	}

	onChange = (checkedValues) => {
		if (!limitSwitch('PERMISSION_UPDATE_ROLE')) return message.warn('当前用户无权修改权限!')
		this.props.settings.update(checkedValues)
	}

	render() {
		const { settings: store } = this.props
		const { permissionsMap, record } = store
		const permissionsData = permissionsMap.find(item => item.id == record.groupId) || {}

		const { permissions } = permissionsData

		return (
			<div>
				{permissions.map(item => {

					const isView = record.permissions.includes(item.id)

					return (
						<div className={styles.item} key={item.id}>
							<div style={{ marginRight: 8, display: 'inline-block', minWidth: 100 }}>
								<Tag color={isView ? 'blue' : ''}>{item.name}</Tag>
							</div>
							{/* {item.childs.map(children => children.name)} */}
							{
								isView ? <CheckboxGroup
									value={toJS(record.permissions)}
									// disabled={!record.permissions.includes(item.id)}
									options={item.childs.map(children => ({ value: children.id, label: children.name }))}
									onChange={this.onChange}
								/> : null
							}

							<Switch
								checked={isView}
								style={{ float: 'right' }}
								defaultChecked
								onChange={this.onSwitch.bind(this, item)} />
						</div>
					)
				})}
			</div>
		)
	}
}
