import React, { Component } from 'react'
import styles from './style.less'
import { Button, Modal } from 'antd'
import { observer, inject } from 'mobx-react'


@observer
export default class Header extends Component {
	state = { loading: false }

	handleSubmit = async () => {
		this.setState({ loading: true })
		try {
			await this.props.handleSubmit()
			this.setState({ loading: false }, () => {
				Modal.success({
					title: '操作成功！',
					onOk: this.props.cb
				})
			})
		} catch (error) {
			this.setState({ loading: false })
		}
	}

	render() {
		const { children, handleSubmit, node } = this.props

		const { loading } = this.state
		return (
			<header className={`${styles.header} flex-vcenter jc-between`}>
				<div className="flex-vcenter">
					<h2 className="flex-vcenter">{children}</h2>
					{node || <Button loading={this.state.loading} onClick={() => this.handleSubmit()} className="ml20" type="primary">保存</Button>}
				</div>
			</header>
		)
	}
}
