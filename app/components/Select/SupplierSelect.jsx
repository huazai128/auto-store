import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Select } from 'antd'
import { get } from 'utils/request'

const Option = Select.Option

@inject('database')
@observer
export default class extends Component {
	render() {
		return (
			<Select {...this.props} >
				{this.props.database.supplierOption}
			</Select>
		)
	}
}
