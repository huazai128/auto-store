import React, { Component } from 'react';
import asyncComponent from 'app/hoc/asyncComponent';

export default [
	{ name: '货品管理', icon: 'profile', url: '/product', Component: asyncComponent(() => import('view/Product')), children: [] },
	{ name: '门店管理', icon: 'shop', url: '/store', Component: asyncComponent(() => import('view/Store')), children: [], },
	{ name: '供应商管理', icon: 'contacts', url: '/supplier', children: [], },
	{ name: '采购管理', icon: 'shopping-cart', url: '/purchase', Component: asyncComponent(() => import('view/Purchase')), children: [], },
	{ name: '采购制单', url: '/purchase/create', Component: asyncComponent(() => import('view/Purchase/Create')), children: [] },
	{ name: '采购单编辑', url: '/purchase/:id', Component: asyncComponent(() => import('view/Purchase/Create')), children: [] },
	{ name: '入库管理', icon: 'download', url: '/storage', children: [], },
	{ name: '发货管理', icon: 'logout', url: '/send', children: [], },
	{ name: '什么奥术大师多制单', url: '/product/:id', Component: asyncComponent(() => import('view/Product/Create')), children: [] },
	{ name: '什么什么制单', url: '/product/create', Component: asyncComponent(() => import('view/Product/Create')), children: [] },
];
