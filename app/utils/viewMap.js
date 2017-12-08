import React, { Component } from 'react';
import asyncComponent from 'app/hoc/asyncComponent';

export default [
	{ name: '货品管理', icon: 'profile', url: '/Product', Component: asyncComponent(() => import('view/Product')), children: [] },
	{ name: '门店管理', icon: 'shop', url: '/Store', children: [], },
	{ name: '供应商管理', icon: 'contacts', url: '/Supplier', children: [], },
	{ name: '采购管理', icon: 'shopping-cart', url: '/Purchase', Component: asyncComponent(() => import('view/Purchase')), children: [], },
	{ name: '采购制单', url: '/Purchase/Create', Component: asyncComponent(() => import('view/Purchase/Create')), children: [] },
	{ name: '入库管理', icon: 'download', url: '/Storage', children: [], },
	{ name: '发货管理', icon: 'logout', url: '/Send', children: [], },
	{ name: '什么奥术大师多制单', url: '/Product/:id', Component: asyncComponent(() => import('view/Product/Create')), children: [] },
	{ name: '什么什么制单', url: '/Product/Create', Component: asyncComponent(() => import('view/Product/Create')), children: [] },
];
