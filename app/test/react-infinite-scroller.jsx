import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';
import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './react-infinite-scroller.less';

const fakeDataUrl = 'https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo';

class InfiniteListExample extends React.Component {
	state = {
		data: [],
		loading: false,
		hasMore: true,
	}
	getData = (callback, page) => {
		reqwest({
			url: fakeDataUrl,
			data: {
				page
			},
			type: 'json',
			method: 'get',
			contentType: 'application/json',
			success: (res) => {
				callback(res);
			},
		});
	}
	// componentWillMount() {
	// 	this.getData((res) => {
	// 		this.setState({
	// 			data: res.results,
	// 		});
	// 	});
	// }

	// componentDidMount() {
	// 	this.getData((res) => {
	// 		this.setState({
	// 			data: res.results,
	// 		});
	// 	});
	// }

	handleInfiniteOnLoad = (page) => {
		let data = this.state.data;
		this.setState({
			loading: true,
		});
		if (data.length > 100) {
			message.warning('Infinite List loaded all');
			this.setState({
				hasMore: false,
				loading: false,
			});
			return;
		}
		this.getData((res) => {
			data = data.concat(res.results);
			this.setState({
				data,
				loading: false,
			});
		}, page);
	}
	render() {
		console.log(this.state.data.length);

		return (
			<div className="demo-infinite-container">
				<InfiniteScroll
					initialLoad
					pageStart={0}
					loadMore={this.handleInfiniteOnLoad}
					hasMore={!this.state.loading && this.state.hasMore}
					loader={<div className="loader" key={0}>Loading ...</div>}
					useWindow
				>
					<List
						dataSource={this.state.data}
						renderItem={item => (
							<List.Item key={item.id}>
								<List.Item.Meta
									avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
									title={<a href="https://ant.design">{item.name.last}</a>}
									description={item.email}
								/>
								<div>Content</div>
							</List.Item>
						)}
					>
						{this.state.loading && this.state.hasMore && <Spin className="demo-loading" />}
					</List>
				</InfiniteScroll>
			</div>
		);
	}
}

export default InfiniteListExample;
