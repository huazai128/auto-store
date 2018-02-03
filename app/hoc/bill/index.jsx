import React, { Component } from 'react'
import HandleButtonOrigin from 'components/Button'
import ButtonExport from 'components/Button-Export'
import { RangePicker } from 'components/DatePicker'
import MainTable from 'components/Table/MainTable'

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

		ExportGroup = ({ data, ...rest }) => (
			<ButtonExport
				store={this.store}
				url={this.store.url}
				{...rest}
			/>
		)

		RangePicker = () => (
			<div className="flex-vcenter ml50">
				查询日期：<RangePicker onChange={this.store.handleRangePicker} />
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
