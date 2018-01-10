import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';

import styles from './List.less';
import _ from 'lodash';

var luckyDraw = ['Colin', 'John', 'James', 'Lily', 'Mary'];

const listData = [];
_.times(50, (i) => {
	listData.push({
		href: 'http://ant.design',
		title: `ant design part ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
		content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
	});
});

const pagination = {
	pageSize: 10,
	current: 1,
	total: listData.length,
	onChange: (() => { }),
};

const IconText = ({ type, text }) => (
	<span>
		<Icon type={type} style={{ marginRight: 8 }} />
		{text}
	</span>
);

export default () => (
	<div className={styles.container} style={{ margin: 50 }}>
		<h1>list-demo</h1>
		<div className={styles.text}>div-a123123123dasdasd</div>
		<div className={styles.text2}>div-a123123123dasdasd</div>
		<List
			itemLayout="vertical"
			size="large"
			pagination={pagination}
			dataSource={listData}
			renderItem={item => (
				<List.Item
					key={item.title}
					actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
					extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
				>
					<List.Item.Meta
						avatar={<Avatar src={item.avatar} />}
						title={<a href={item.href}>{item.title}</a>}
						description={item.description}
					/>
					{item.content}
				</List.Item>
			)}
		/>
	</div>
);