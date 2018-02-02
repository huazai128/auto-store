import React, { Component } from 'react'
import { Button } from 'antd'
import { serializeParams } from 'utils'
import { _API_BASE_ } from 'utils/request'
import { observer, inject } from 'mobx-react'

const ButtonGroup = Button.Group

@inject('user')
@observer
export default class extends Component {
	static defaultProps = {
		columns: [],
		billColumns: []
	}

	computeData = (columns) => {
		if (columns.length == 0) return {}

		const filterColumns = columns.filter(item => item.title).filter(item => item.fix || item.checked || !('checked' in item))

		const result = {}

		filterColumns.forEach(item => {
			result[item.key] = item.mark || item.title
		})

		return {
			fields: JSON.stringify(result)
		}
	}

	render() {
		const {
			store,
			withDetail,
			disabled = false,
			url,
			data = {},
			columns,
			billColumns,
			...rest } = this.props
		if (store) data.ids = store.selectedRows.map(item => item.id)

		const { access_token } = this.props.user
		const { ids = [] } = data

		const exportOtherData = this.computeData(columns)
		const exportDetailOtherData = this.computeData(billColumns)

		const BindButton = ({ type, children }) => (
			<a href={
				type !== 'detail'
					? `${_API_BASE_}${url}/export?${serializeParams({ access_token, ...data, ...exportOtherData })}`
					: `${_API_BASE_}${url}/exportItems?${serializeParams({ access_token, ...data, ...exportDetailOtherData })}`
			}>
				<Button
					ghost
					type="primary"
					disabled={disabled || ids && ids.length === 0}
					icon="export"
					style={{ marginLeft: 20 }}
					{...rest}
				>
					{children}
				</Button>
			</a>
		)

		return (
			[
				<BindButton key="ButtonExport1" {...rest}>Excel导出资料</BindButton>,
				withDetail && <BindButton key="ButtonExport2" type="detail" {...rest}>Excel导出单据详情</BindButton>
			]
		)
	}
}
