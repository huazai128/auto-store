import React, { Component } from 'react'
import stores from '../../stores'

export const Limit = ({ permission = '', children }) => (
	stores.user.userPermissions.includes(permission) || stores.user.userPermissions.includes('PERMISSION_ADMIN_ALL')
		? children
		: null
)
export const limitSwitch = (permission = '') => (
	stores.user.userPermissions.includes(permission) || stores.user.userPermissions.includes('PERMISSION_ADMIN_ALL')
)
