import React, { Component } from 'react'
import HandleButtonOrigin from 'components/Button'
import ButtonExport from 'components/Button-Export'
import { RangePicker, DatePicker } from 'components/DatePicker'
import MainTable from 'components/Table/MainTable'

import { observer, inject } from 'mobx-react'

@observer
export default WrappedComponent => {
	return class extends Component {
		store = this.props.store

		HandleButton = ({ children, ...rest }) => React.cloneElement(<HandleButtonOrigin>{children}</HandleButtonOrigin>, { store: this.store, ...rest })

		DeleteButton = ({ children, ...rest }) => (
			<this.HandleButton
				method="delete"
				state="created"
				style={{ marginLeft: 20 }}
				type="danger"
				confirm {...rest}>
				{children}
			</this.HandleButton>
		)

		ExportGroup = props => (
			<ButtonExport
				store={this.store}
				url={this.store.url}
				{...props}
			/>
		)

		RangePicker = props => (
			// value={[this.store.query.start, this.store.query.end]} onChange={this.store.handleRangePicker}
			<div className="flex-vcenter ml30">
				查询日期：<RangePicker store={this.store} {...props} />
			</div>
		)

		DatePicker = (props) => (
			<div className="flex-vcenter ml30">
				查询日期：<DatePicker onChange={this.store.handlePicker} {...props} />
			</div>
		)

		MainTable = props => { return React.cloneElement(<MainTable />, { store: this.store, ...props }) }

		render() {
			const part = {
				HandleButton: this.HandleButton,
				DeleteButton: this.DeleteButton,
				ExportGroup: this.ExportGroup,
				RangePicker: this.RangePicker,
				MainTable: this.MainTable,
				DatePicker: this.DatePicker,
				Upload: this.Upload,
			}
			return (
				<WrappedComponent
					part={part}
					{...this.props}
				/>
			)
		}
	}
}
