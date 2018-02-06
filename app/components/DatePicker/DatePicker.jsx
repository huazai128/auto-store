import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'

@observer
export default class extends Component {
	render() {
		return (
			<DatePicker
				{...this.props}
			/>
		)
	}
}
