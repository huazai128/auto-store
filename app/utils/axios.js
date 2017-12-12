import axios from 'axios';

/**
 *
 * @create by 2017-11-25
 * @param {any} params
 * @returns
 */

export const API_HOST = process.env.NODE_ENV == 'production' ? 'http://192.168.0.150:9000' : 'http://192.168.0.209:3721';

export const callApi = async (endpoint, params = null, method = 'GET') => {
	const newAxios = axios.create({
		baseURL: API_HOST,
		timeout: 5000,
		params: {
			access_token: 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTMxMTAwMTUsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjdmMWFlMDMyLWYxZjQtNGU5OS1hNTc2LTQ4YTQ0M2QwMmVmNyIsImNsaWVudF9pZCI6IlR4eEdqWVpDQVViUWd4aXBLeldadGp2WXVnR0dvUWRWSVlTVVN2QWhxS1dQbFdOeXFkWlNPT0lNVmNVSlFMRnciLCJzY29wZSI6WyJmd2FwaV9iYXNlIl19.J6jCaRYecPTmqeDJDZp8OLfyz55pQetI47a0P7Vapvc'
		}
	});

	if (method == 'GET') {
		const { data: response } = await newAxios.get(endpoint, {
			params: params
		});
		return response;

	} else {
		const { data: response } = await newAxios.post(endpoint, params);
		return response;
	}
};

export const getApi = (endpoint, params = {}) => callApi(endpoint, params, 'GET');
export const postApi = (endpoint, params = {}) => callApi(endpoint, params, 'POST');

