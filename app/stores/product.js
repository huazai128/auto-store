import { observable, computed, useStrict, action, runInAction, toJS, autorun } from 'mobx';
import { getApi, postApi } from 'utils';
import viewMap from 'utils/viewMap';

const _data = [];

for (let index = 0; index < 100; index++) {
	_data.push({
		key: index,
		state: 'confirmed',
		b: 32,
		c: '西湖区湖底公园1大大大阿达反登反斯蒂芬斯蒂芬号',
		d: '品牌',
		e: '品牌',
		f: '品牌',
		g: '品牌',
		aa: '品牌',
		bb: '品牌',
		cc: '品牌',
		dd: '品牌',
		ee: '品牌',
		ff: '品牌',
		gg: '品牌',
		hh: new Date().valueOf()
	});
}

useStrict(true);
class Store {
	@observable data = []
	@observable columns = [
		{
			width: 100,
			title: '状态',
			key: 'state',
			type: 'state',
			stateInfo: {
				confirmed: '货品资料已在系统内生效，且已有数据产生，不可反应用，但可以修改供应商信息及自定义属性内容！',
				checked: '货品资料已在系统内生效，但尚未产生数据，可以修改供应商信息及自定义属性内容！',
				pending: '货品资料没有在系统内生效，可修改所有资料内容，也可进行删除！'
			}
		},
		{ width: 100, title: '商品编号', key: 'b', },
		{ width: 150, title: '商品名称', key: 'c', },
		{ width: 100, title: '品牌', key: 'd', },
		{ width: 100, title: '大品类', key: 'e', },
		{ width: 100, title: '小品类', key: 'f', },
		{ width: 100, title: '规格', key: 'g', },
		{ width: 80, title: '采购价', key: 'aa', },
		{ width: 80, title: '结算价', key: 'bb', },
		{ width: 100, title: '备注', key: 'cc', },
		{ width: 100, title: '供应商名称', key: 'dd', },
		{ width: 100, title: '供应商编号', key: 'ee', },
		{ width: 80, title: '录入人', key: 'ff', },
		{ width: 80, title: '修改人', key: 'gg', },
		{ width: 100, title: '最后修改日期', key: 'hh', type: 'date' },
	];

	@observable tableLoading = false

	@action getData = () => {
		setTimeout(() => {
			runInAction(() => {
				this.data = _data;
			});
		}, 150);
	}

	@action update = (e) => {
		this.tableLoading = true;
		setTimeout(() => {
			runInAction(() => {
				this.tableLoading = false;
			});
		}, 2000);
	}

	@computed get dataSource() {
		return toJS(this.data);
	}

}

const store = new Store();

export default store;
