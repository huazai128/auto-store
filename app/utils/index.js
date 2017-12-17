import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

export const showError = (error) => {
	// return error;
	return Modal.error({
		title: '操作错误',
		// content: <div><p>message:</p><pre>{JSON.stringify(error, null, 2)}</pre></div>
		content: error
	});
};

axios.defaults.baseURL = 'http://192.168.0.133:3721';
axios.defaults.timeout = 5000;
axios.defaults.params = {
	access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTM1MjA3MzMsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiZndhcGlfYmFzZSJdLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMTMyYzljMWQtNGM3Mi00MTIwLTk1MmUtNDYxYzJhNjRjOWU3IiwiY2xpZW50X2lkIjoiVHh4R2pZWkNBVWJRZ3hpcEt6V1p0anZZdWdHR29RZFZJWVNVU3ZBaHFLV1BsV055cWRaU09PSU1WY1VKUUxGdyJ9.L_ZQHHYW5OuM4d9KItjeyX7SWEz6Ku0cxmVzd-ZP4pM'
};

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error && error.response) {
			/* eslint-disable */
			switch (error.response.status) {
				case 400:
					error.message = '错误请求,请求参数有误';
					break;
				case 401:
					error.message = '未授权，请重新登录';
					break;
				case 403:
					error.message = '拒绝访问';
					break;
				case 404:
					error.message = '请求错误,未找到该资源';
					break;
				case 405:
					error.message = '请求方法未允许';
					break;
				case 408:
					error.message = '请求超时';
					break;
				case 500:
					error.message = '服务器端出错';
					break;
				case 501:
					error.message = '网络未实现';
					break;
				case 502:
					error.message = '网络错误';
					break;
				case 503:
					error.message = '服务不可用';
					break;
				case 504:
					error.message = '网络超时';
					break;
				case 505:
					error.message = 'http版本不支持该请求';
					break;
				default:
					error.message = `连接错误${error.response.status}`;
				/* eslint-enable */
			}
		} else {
			error.message = '连接到服务器失败';
		}
		// showError(error.message);
		return Promise.reject(error.message);
	}
);


export const get = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params,
		}).then(res => {
			const { data } = res;
			// if (data.code !== 0) {
			// 	reject(showError(data));
			// }
			resolve(data);
		}).catch(error => reject(error));
	});
};

export const post = (url, params) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: params,
		}).then(res => {
			const { data } = res;
			resolve(data);
		}).catch(error => reject(error));
	});
};

export const postByParam = (url, params = {}) => {
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			params,
		}).then(res => {
			const { data } = res;
			if (data.code !== 0) {
				reject(showError(data));
			}
			resolve(data);
		}).catch(error => reject(error));
	});
};

export const filterRepeat = (arr, key) => {
	return [...new Set(arr.map(item => item[key]))].map(value => arr.find(item => item[key] === value));
};
