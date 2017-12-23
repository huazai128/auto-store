import React from 'react';
import { observer } from 'mobx-react';
import 'assets/styles/iconfont.css';

const BizIcon = observer((props) => {
	const { type, className = '', ...reset } = props;
	return <i className={`iconfont icon-${type} ${className}`} {...reset} />;
});
export default BizIcon;
