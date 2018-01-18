import React, { Component } from 'react';
import asyncComponent from 'app/hoc/asyncComponent';

export default [
	{ name: '品类管理', icon: 'tags-o	', url: '/tag', Component: asyncComponent(() => import('view/Tag')), children: [] },
	{ name: '货品管理', icon: 'profile', url: '/product', Component: asyncComponent(() => import('view/Product')), children: [] },
	{ name: '门店管理', icon: 'shop', url: '/store', Component: asyncComponent(() => import('view/Store')), children: [], },
	{ name: '供应商管理', icon: 'contacts', url: '/supplier', Component: asyncComponent(() => import('view/Supplier')), children: [], },
	// { name: '仓库管理', icon: 'home', url: '/warehouse', Component: asyncComponent(() => import('view/Warehouse')), children: [], },


	{ name: '采购管理', icon: 'shopping-cart', url: '/purchase', Component: asyncComponent(() => import('view/Purchase')), children: [], },
	{ name: '采购制单', url: '/purchase/create', Component: asyncComponent(() => import('view/Purchase/Create')), children: [] },
	{ name: '采购单编辑', url: '/purchase/:id', Component: asyncComponent(() => import('view/Purchase/Create')), children: [] },

	{ name: '入库管理', icon: 'download', url: '/storage', Component: asyncComponent(() => import('view/Storage')), children: [], },
	{ name: '入库制单', url: '/storage/create', Component: asyncComponent(() => import('view/Storage/Create')), children: [], },
	{ name: '入库单编辑', url: '/storage/:id', Component: asyncComponent(() => import('view/Storage/Create')), children: [], },

	{ name: '配货管理', icon: 'gift', url: '/distributions', Component: asyncComponent(() => import('view/Distributions')), children: [], },
	{ name: '配货单制单', url: '/distributions/create', Component: asyncComponent(() => import('view/Distributions/Create')), children: [], },
	{ name: '配货单编辑', url: '/distributions/:id', Component: asyncComponent(() => import('view/Distributions/Create')), children: [], },

	{ name: '发货管理', icon: 'logout', url: '/send', Component: asyncComponent(() => import('view/Send')), children: [], },
	// { name: '发货制单', url: '/send/create', Component: asyncComponent(() => import('view/Send/Create')), children: [], },

	{ name: '门店收货管理', icon: 'schedule', url: '/receive', Component: asyncComponent(() => import('view/Receive')), children: [], },

	{ name: '销售单管理', icon: 'copy', url: '/sales', Component: asyncComponent(() => import('view/Sales')), children: [], },

	{ name: '退厂管理', icon: 'rollback', url: '/return', Component: asyncComponent(() => import('view/Return')), children: [], },
	{ name: '退厂单制单', url: '/return/create', Component: asyncComponent(() => import('view/Return/Create')), children: [], },
	{ name: '退厂单编辑', url: '/return/:id', Component: asyncComponent(() => import('view/Return/Create')), children: [], },

	{ name: '退货管理', icon: 'car', url: '/refunds', Component: asyncComponent(() => import('view/Refunds')), children: [], },
	{ name: '退货单制单', url: '/refunds/create', Component: asyncComponent(() => import('view/Refunds/Create')), children: [], },
	{ name: '退货单编辑', url: '/refunds/:id', Component: asyncComponent(() => import('view/Refunds/Create')), children: [], },

	// { name: 'demo', icon: 'schedule', url: '/demo', Component: asyncComponent(() => import('app/test/G2')), children: [], },

	// { name: '盘点管理', icon: 'calculator', url: '/stocktakings', Component: asyncComponent(() => import('view/Stocktakings')), children: [], },
	// { name: '盘点单制单', url: '/stocktakings/create', Component: asyncComponent(() => import('view/Stocktakings/Create')), children: [], },
	// { name: '盘点单编辑', url: '/stocktakings/:id', Component: asyncComponent(() => import('view/Stocktakings/Create')), children: [], },
];
