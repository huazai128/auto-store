import React, { Component } from 'react'
import asyncComponent from 'app/hoc/asyncComponent'

export default [
	{ name: '品类管理', icon: 'tags-o	', url: '/tag', Component: asyncComponent(() => import('view/Tag')), },
	{ name: '货品管理', icon: 'profile', url: '/product', Component: asyncComponent(() => import('view/Product')), },
	{ name: '门店管理', icon: 'shop', url: '/store', Component: asyncComponent(() => import('view/Store')), },
	{ name: '供应商管理', icon: 'contacts', url: '/supplier', Component: asyncComponent(() => import('view/Supplier')), },
	// { name: '仓库管理', icon: 'home', url: '/warehouse', Component: asyncComponent(() => import('view/Warehouse')),  , },


	{ name: '采购管理', icon: 'shopping-cart', url: '/purchase', Component: asyncComponent(() => import('view/Purchase')), },
	{ name: '采购制单', url: '/purchase/create', Component: asyncComponent(() => import('view/Purchase/Create')), },
	{ name: '采购单编辑', url: '/purchase/:id', Component: asyncComponent(() => import('view/Purchase/Create')), },

	{ name: '入库管理', icon: 'download', url: '/storage', Component: asyncComponent(() => import('view/Storage')), },
	{ name: '入库制单', url: '/storage/create', Component: asyncComponent(() => import('view/Storage/Create')), },
	{ name: '入库单编辑', url: '/storage/:id', Component: asyncComponent(() => import('view/Storage/Create')), },

	{ name: '配货管理', icon: 'gift', url: '/distributions', Component: asyncComponent(() => import('view/Distributions')), },
	{ name: '配货单制单', url: '/distributions/create', Component: asyncComponent(() => import('view/Distributions/Create')), },
	{ name: '配货单编辑', url: '/distributions/:id', Component: asyncComponent(() => import('view/Distributions/Create')), },

	{ name: '发货管理', icon: 'logout', url: '/send', Component: asyncComponent(() => import('view/Send')), },
	// { name: '发货制单', url: '/send/create', Component: asyncComponent(() => import('view/Send/Create')),  , },

	{ name: '门店收货管理', icon: 'schedule', url: '/receive', Component: asyncComponent(() => import('view/Receive')), },

	{ name: '销售单管理', icon: 'copy', url: '/sales', Component: asyncComponent(() => import('view/Sales')), },

	{ name: '退厂管理', icon: 'rollback', url: '/return', Component: asyncComponent(() => import('view/Return')), },
	{ name: '退厂单制单', url: '/return/create', Component: asyncComponent(() => import('view/Return/Create')), },
	{ name: '退厂单编辑', url: '/return/:id', Component: asyncComponent(() => import('view/Return/Create')), },

	{ name: '退货管理', icon: 'car', url: '/refunds', Component: asyncComponent(() => import('view/Refunds')), },
	{ name: '退货单制单', url: '/refunds/create', Component: asyncComponent(() => import('view/Refunds/Create')), },
	{
		name: '退货单编辑',
		url: '/refunds/:id',
		Component: asyncComponent(() => import('view/Refunds/Create')),
	},


	{ name: '盘点管理', icon: 'calculator', url: '/stocktakings', Component: asyncComponent(() => import('view/Stocktakings')), },
	{ name: '盘点单制单', url: '/stocktakings/create', Component: asyncComponent(() => import('view/Stocktakings/Create')), },
	// { name: '盘点单编辑', url: '/stocktakings/:id', Component: asyncComponent(() => import('view/Stocktakings/Create')), },

	{
		name: '账号管理',
		icon: 'setting',
		subMenu: [
			{ name: '工作组配置', url: '/work', Component: asyncComponent(() => import('view/setting/work')), },
			{ name: '账号配置', url: '/zhanghao', Component: asyncComponent(() => import('view/setting/account')), }
		]
	},


	// { name: 'demo', icon: 'schedule', url: '/demo', Component: asyncComponent(() => import('app/test/G2')),  , },
]
