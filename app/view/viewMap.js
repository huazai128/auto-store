import React, { Component } from 'react'
import asyncComponent from 'app/hoc/asyncComponent'

export default [
	{
		name: '品类管理',
		icon: 'tags-o	',
		url: '/tag',
		Component: asyncComponent(() => import('view/Tag')),
		permissions: 'PERMISSION_VIEW_ATTR'
	},
	{
		name: '货品管理',
		icon: 'profile',
		url: '/product',
		Component: asyncComponent(() => import('view/Product')),
		permissions: 'PERMISSION_VIEW_SKU'
	},
	{
		name: '门店管理',
		icon: 'shop',
		url: '/store',
		Component: asyncComponent(() => import('view/Store')),
		permissions: 'PERMISSION_VIEW_STORE'
	},
	{
		name: '供应商管理',
		icon: 'contacts',
		url: '/supplier',
		Component: asyncComponent(() => import('view/Supplier')),
		permissions: 'PERMISSION_VIEW_SUPPLIER'
	},
	/**
	|--------------------------------------------------
	| 采购管理
	|--------------------------------------------------
	*/
	{
		name: '采购管理',
		icon: 'shopping-cart',
		url: '/purchase',
		Component: asyncComponent(() => import('view/Purchase')),
		permissions: 'PERMISSION_VIEW_PURCHASE'
	},
	{
		name: '采购制单',
		url: '/purchase/create',
		Component: asyncComponent(() => import('view/Purchase/Create')),
		permissions: 'PERMISSION_ADD_REFUND',
		callbackPathname: '/purchase'
	},
	{
		name: '采购单编辑',
		url: '/purchase/:id',
		Component: asyncComponent(() => import('view/Purchase/Create')),
		permissions: 'PERMISSION_UPDATE_REFUND',
		callbackPathname: '/purchase'
	},
	/**
	|--------------------------------------------------
	| 入库管理
	|--------------------------------------------------
	*/
	{
		name: '入库管理',
		icon: 'download',
		url: '/storage',
		Component: asyncComponent(() => import('view/Storage')),
		permissions: 'PERMISSION_VIEW_STOCKIN'
	},
	{
		name: '入库制单',
		url: '/storage/create',
		Component: asyncComponent(() => import('view/Storage/Create')),
		permissions: 'PERMISSION_ADD_STOCKIN',
		callbackPathname: '/storage'
	},
	// { name: '入库单编辑', url: '/storage/:id', Component: asyncComponent(() => import('view/Storage/Create')), },
	/**
	|--------------------------------------------------
	| 配货管理
	|--------------------------------------------------
	*/
	{
		name: '配货管理',
		icon: 'gift',
		url: '/distributions',
		Component: asyncComponent(() => import('view/Distributions')),
		permissions: 'PERMISSION_VIEW_DISTRIBUTION'
	},
	{
		name: '配货单制单',
		url: '/distributions/create',
		Component: asyncComponent(() => import('view/Distributions/Create')),
		permissions: 'PERMISSION_ADD_DISTRIBUTION',
		callbackPathname: '/distributions',
		byWarehouse: true
	},
	{
		name: '配货单编辑',
		url: '/distributions/:id',
		Component: asyncComponent(() => import('view/Distributions/Create')),
		permissions: 'PERMISSION_UPDATE_DISTRIBUTION',
		callbackPathname: '/distributions',
		byWarehouse: true
	},
	/**
	|--------------------------------------------------
	| 发货管理
	|--------------------------------------------------
	*/
	{
		name: '发货管理',
		icon: 'logout',
		url: '/send',
		Component: asyncComponent(() => import('view/Send')),
		permissions: 'PERMISSION_VIEW_SHIPMENT'
	},
	/**
	|--------------------------------------------------
	| 门店收货管理
	|--------------------------------------------------
	*/
	{
		name: '门店收货管理',
		icon: 'schedule',
		url: '/receive',
		Component: asyncComponent(() => import('view/Receive')),
		permissions: 'PERMISSION_VIEW_STORE_RECEIVE'
	},
	/**
	|--------------------------------------------------
	| 退厂管理
	|--------------------------------------------------
	*/
	{
		name: '退厂管理',
		icon: 'rollback',
		url: '/return',
		Component: asyncComponent(() => import('view/Return')),
		permissions: 'PERMISSION_VIEW_REFUND'
	},
	{
		name: '退厂单制单',
		url: '/return/create',
		Component: asyncComponent(() => import('view/Return/Create')),
		permissions: 'PERMISSION_ADD_REFUND',
		callbackPathname: '/return',
		byWarehouse: true
	},
	{
		name: '退厂单编辑',
		url: '/return/:id',
		Component: asyncComponent(() => import('view/Return/Create')),
		permissions: 'PERMISSION_UPDATE_REFUND',
		callbackPathname: '/return',
		byWarehouse: true
	},
	/**
	|--------------------------------------------------
	| 门店退货发货管理
	|--------------------------------------------------
	*/
	{
		name: '门店退货发货管理',
		icon: 'car',
		url: '/refunds',
		Component: asyncComponent(() => import('view/Refunds')),
		permissions: 'PERMISSION_VIEW_STORE_REFUND'
	},
	{
		name: '门店退货发货单制单',
		url: '/refunds/create',
		Component: asyncComponent(() => import('view/Refunds/Create')),
		permissions: 'PERMISSION_ADD_STORE_REFUND',
		callbackPathname: '/refunds',
		byWarehouse: true

	},
	{
		name: '门店退货发货单编辑',
		url: '/refunds/:id',
		Component: asyncComponent(() => import('view/Refunds/Create')),
		permissions: 'PERMISSION_UPDATE_STORE_REFUND',
		callbackPathname: '/refunds',
		byWarehouse: true

	},
	/**
	|--------------------------------------------------
	| 门店退货收货管理
	|--------------------------------------------------
	*/
	{
		name: '门店退货收货管理',
		icon: 'swap',
		url: '/return-receive',
		Component: asyncComponent(() => import('view/ReturnReceive')),
		permissions: 'PERMISSION_VIEW_REFUND_RECEIVE'
	},
	/**
	|--------------------------------------------------
	| 盘点管理
	|--------------------------------------------------
	*/
	{
		name: '盘点管理',
		icon: 'calculator',
		url: '/stocktakings',
		Component: asyncComponent(() => import('view/Stocktakings')),
		permissions: 'PERMISSION_VIEW_STOCKTAKING'
	},
	{
		name: '盘点单制单',
		url: '/stocktakings/create',
		Component: asyncComponent(() => import('view/Stocktakings/Create')),
		permissions: 'PERMISSION_ADD_STOCKTAKING',
		callbackPathname: '/stocktakings'
	},
	{
		name: '盘点单编辑',
		url: '/stocktakings/:id',
		Component: asyncComponent(() => import('view/Stocktakings/Create')),
		permissions: 'PERMISSION_UPDATE_STOCKTAKING',
		callbackPathname: '/stocktakings'
	},
	// ============================================================
	{
		name: '销售单管理',
		icon: 'copy',
		url: '/sales',
		Component: asyncComponent(() => import('view/Sales')),
		permissions: 'PERMISSION_VIEW_SALE'
	},
	{
		name: '报表中心',
		icon: 'area-chart',
		subMenu: [
			{ name: '库存查询表', url: '/inventory', Component: asyncComponent(() => import('view/Report/Inventory')), permissions: 'PERMISSION_VIEW_INVENTORY' },
			{ name: '进销存报表', url: '/invoicings', Component: asyncComponent(() => import('view/Report/invoicings')), permissions: 'PERMISSION_VIEW_INVOICING' }
		]
	},

	{
		name: '账号管理',
		icon: 'setting',
		subMenu: [
			{ name: '工作组配置', url: '/work', Component: asyncComponent(() => import('view/setting/Work')), permissions: 'PERMISSION_VIEW_ROLE' },
			{ name: '账号配置', url: '/account', Component: asyncComponent(() => import('view/setting/Account')), permissions: 'PERMISSION_VIEW_ACCOUNT' }
		]
	},
]
