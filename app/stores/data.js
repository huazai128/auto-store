// import React, { Component } from 'react';
// import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
// import TablePrototype from './TablePrototype';
// import { get, post, postByParam } from 'utils';

// useStrict(true);

// class Store {
// 	constructor() {
// 		this.getData({ url: 'api/suppliers', data: this.supplierData });
// 	}

// 	@observable supplierData = []

// 	@action getData = async ({ url, data }) => {
// 		const { data } = await get(url, { size: 9999 });
// 		runInAction(() => {
// 			this.supplierData = data;
// 		});
// 	}


// }

// const store = new Store();

// export default store;
