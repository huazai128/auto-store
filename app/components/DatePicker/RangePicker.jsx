import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import { observer } from 'mobx-react'

const { RangePicker } = DatePicker

@observer
export default class extends Component {
	render() {
		return (
			<RangePicker
				ranges={{
					'今天': [moment().startOf('day'), moment().startOf('day')],
					'近7天': [moment().subtract(6, 'days').startOf('day'), moment().startOf('day')],
					'本月': [moment().startOf('month'), moment().startOf('day')],
				}}
				{...this.props}
			/>
		)
	}
}
