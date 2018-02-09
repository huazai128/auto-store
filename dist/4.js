webpackJsonp([4],{

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

var _mobxReact = __webpack_require__(13);

var _moment = __webpack_require__(28);

var _moment2 = _interopRequireDefault(_moment);

var _Layout = __webpack_require__(150);

var _SearchPro = __webpack_require__(447);

var _SearchPro2 = _interopRequireDefault(_SearchPro);

var _createTable = __webpack_require__(448);

var _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (_dec = (0, _mobxReact.inject)(function (stores) {
	return {
		body: stores.body,
		backStore: stores.distributions
	};
}), _dec2 = (0, _createTable2.default)({
	setFields: ['fromWarehouse', 'toWarehouse', 'shipDate']
}), _dec(_class = _dec2(_class = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, _default);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.columns = [{ width: 200, title: '货品', key: 'number' }, { width: 150, title: '货品名称', key: 'name' }, { width: 80, title: '采购价', key: 'costPrice' }, { width: 80, title: '结算价', key: 'price' }, { width: 100, title: '配货数量', key: 'amount', edit: { type: 'number' } }, { width: 200, title: '备注', key: 'note' }], _this.computedQuery = function (value) {
			value.items.forEach(function (item) {
				item.skuId = item.skuId || item.id;
				delete item.id;
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(_default, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    BackCreateHearder = _props.BackCreateHearder,
			    RenderCreateTable = _props.RenderCreateTable,
			    BindedFormItem = _props.BindedFormItem,
			    RenderUpload = _props.RenderUpload,
			    handleSubmit = _props.handleSubmit,
			    addItems = _props.addItems,
			    toWarehouseField = _props.toWarehouseField,
			    fromWarehouseField = _props.fromWarehouseField,
			    warehouseField = _props.warehouseField,
			    supplierField = _props.supplierField,
			    sequenceField = _props.sequenceField;


			return _react2.default.createElement(
				_Layout.Container,
				null,
				_react2.default.createElement(BackCreateHearder, { handleSubmit: function handleSubmit() {
						return _this2.props.handleSubmit(_this2.computedQuery);
					} }),
				_react2.default.createElement(
					_Layout.Content,
					{ style: { padding: 10 } },
					_react2.default.createElement(
						_antd.Form,
						null,
						_react2.default.createElement(
							_Layout.HandleArea,
							{ className: 'create-handle-area', style: { margin: 0 } },
							_react2.default.createElement(
								'div',
								{ className: 'flex-vcenter' },
								sequenceField,
								toWarehouseField,
								fromWarehouseField,
								_react2.default.createElement(
									BindedFormItem,
									{ label: '\u53D1\u8D27\u65E5\u671F',
										initialValue: (0, _moment2.default)().startOf('day'),
										rules: true,
										keyValue: 'shipDate'
									},
									_react2.default.createElement(_antd.DatePicker, { allowClear: false })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'flex-vcenter' },
								_react2.default.createElement(
									BindedFormItem,
									{ label: '\u5907\u6CE8', keyValue: 'note' },
									_react2.default.createElement(_antd.Input, { style: { width: 350 } })
								)
							)
						)
					),
					_react2.default.createElement(RenderCreateTable, {
						columns: this.columns,
						title: function title() {
							return _react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(
									'strong',
									null,
									'\u5355\u636E\u660E\u7EC6\u7F16\u8F91'
								),
								_react2.default.createElement(_SearchPro2.default, { onChange: function onChange(item) {
										return addItems([item]);
									} }),
								_react2.default.createElement(
									RenderUpload,
									{ columns: _this2.columns },
									_react2.default.createElement(
										_antd.Button,
										{ type: 'primary', icon: 'file-excel', ghost: true, className: 'ml20' },
										'Excel\u5BFC\u5165\u5546\u54C1'
									)
								)
							);
						}
					})
				)
			);
		}
	}]);

	return _default;
}(_react.Component)) || _class) || _class);

exports.default = _default;

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(440);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(39)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 440:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(38)(true);
// imports


// module
exports.push([module.i, "/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n.style-header__1FJKG {\n  padding: 0 15px;\n  height: 45px;\n  background-color: #fff;\n}\n.style-header__1FJKG h2 {\n  font-weight: bold;\n}\n.style-header__1FJKG h2::before {\n  -webkit-border-radius: 2px;\n          border-radius: 2px;\n  display: block;\n  content: '';\n  margin-right: 10px;\n  width: 4px;\n  height: 24px;\n  background-color: #33B4DE;\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Desktop/dyun/auto-store/app/components/Header/style.less"],"names":[],"mappings":"AAAA,6FAA6F;AAC7F,8CAA8C;AAC9C,4EAA4E;AAC5E,4EAA4E;AAC5E;EACE,gBAAgB;EAChB,aAAa;EACb,uBAAuB;CACxB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,2BAA2B;UACnB,mBAAmB;EAC3B,eAAe;EACf,YAAY;EACZ,mBAAmB;EACnB,WAAW;EACX,aAAa;EACb,0BAA0B;CAC3B","file":"style.less","sourcesContent":["/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n.header {\n  padding: 0 15px;\n  height: 45px;\n  background-color: #fff;\n}\n.header h2 {\n  font-weight: bold;\n}\n.header h2::before {\n  -webkit-border-radius: 2px;\n          border-radius: 2px;\n  display: block;\n  content: '';\n  margin-right: 10px;\n  width: 4px;\n  height: 24px;\n  background-color: #33B4DE;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"header": "style-header__1FJKG"
};

/***/ }),

/***/ 442:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (WrappedComponent) {
	return function (_React$Component) {
		_inherits(_class2, _React$Component);

		function _class2(props) {
			_classCallCheck(this, _class2);

			var _this = _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).call(this, props));

			_this.state = {
				visible: _this.props.visible || false,
				confirmLoading: false
			};

			_this.showModal = function () {
				return _this.setState({ visible: true }, function () {
					return _this.props.showbefore && _this.props.showbefore();
				});
			};

			_this.onConfirmLoading = function (boolean) {
				return _this.setState({ confirmLoading: boolean });
			};

			_this.handleCancel = function () {
				var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

				_this.setState({
					visible: false,
					confirmLoading: false
				}, cb);
			};

			var title = props.title;

			/* onCancel, confirmLoading, visible, title */

			_this.HocModal = function (_ref) {
				var children = _ref.children,
				    rest = _objectWithoutProperties(_ref, ['children']);

				return _react2.default.cloneElement(_react2.default.createElement(
					_antd.Modal,
					null,
					children
				), _extends({
					onCancel: function onCancel() {
						return _this.handleCancel();
					},
					confirmLoading: _this.state.confirmLoading,
					visible: _this.state.visible,
					title: title
				}, rest));
			};

			return _this;
		}

		// componentWillReceiveProps(nextProps) {
		// 	const { visible } = nextProps;
		// 	this.setState({ visible });
		// }

		_createClass(_class2, [{
			key: 'render',
			value: function render() {
				return [_react2.default.cloneElement(this.props.children, { onClick: this.showModal, key: 'outer' }), _react2.default.createElement(WrappedComponent, _extends({
					key: 'WrappedComponent',
					HocModal: this.HocModal,
					onConfirmLoading: this.onConfirmLoading,
					handleCancel: this.handleCancel
				}, this.state, this.props))];
			}
		}]);

		return _class2;
	}(_react2.default.Component);
};

/***/ }),

/***/ 443:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _antd = __webpack_require__(6);

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _modal = __webpack_require__(442);

var _modal2 = _interopRequireDefault(_modal);

var _UploadTable = __webpack_require__(444);

var _UploadTable2 = _interopRequireDefault(_UploadTable);

var _style = __webpack_require__(445);

var _style2 = _interopRequireDefault(_style);

var _utils = __webpack_require__(61);

var _mobxReact = __webpack_require__(13);

var _request = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (_dec = (0, _mobxReact.inject)('user'), _dec(_class = (0, _modal2.default)(_class = (0, _mobxReact.observer)(_class = function (_Component) {
	_inherits(_default, _Component);

	function _default() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, _default);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.state = { fileList: [] }, _this.onChange = function (_ref2) {
			var fileList = _ref2.fileList;

			fileList.forEach(function (item) {
				if (item.response && item.response.code !== 0) item.status = 'error';
			});

			_this.setState({ fileList: fileList });
		}, _this.onPreview = function (file) {
			if (!file.response) return;

			if (file.response.code !== 0) return _antd.Modal.error({
				title: '上传文件有误：',
				maskClosable: true,
				content: _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'p',
						null,
						'message:'
					),
					_react2.default.createElement(
						'pre',
						null,
						JSON.stringify(file.response, null, 2)
					)
				)
			});

			var items = file.response.data.success || [];

			_antd.Modal.success({
				maskClosable: true,
				width: 1000,
				title: _react2.default.createElement(
					'div',
					{ className: 'flex jc-between' },
					_react2.default.createElement(
						'div',
						null,
						'\u5BFC\u5165\u5185\u5BB9\u8BE6\u60C5'
					),
					_react2.default.createElement(
						_antd.Tooltip,
						{ placement: 'bottomRight', title: '\u672C\u6B21\u5BFC\u5165\u4EC5\u4F9B\u53C2\u8003\uFF0C\u4E00\u5207\u4EE5\u5B9E\u7269\u4E3A\u51C6~' },
						_react2.default.createElement(
							'div',
							{ className: 'primary-6' },
							_react2.default.createElement(_antd.Icon, { type: 'question-circle-o' }),
							_react2.default.createElement(
								'span',
								{ className: 'fs12 ml5' },
								'\u5173\u4E8E\u5BFC\u5165'
							)
						)
					)
				),
				content: _react2.default.createElement(_UploadTable2.default, {
					file: file,
					dataSource: items,
					columns: _this.props.columns.filter(function (i) {
						return i.key !== 'delete';
					})
				}),
				okText: '确定'
			});
		}, _this.afterClose = function () {
			return _this.setState({ fileList: [] });
		}, _this.onOk = function () {
			var successFileList = _this.state.fileList.filter(function (file) {
				return file.response && file.response.code == 0;
			});

			var items = successFileList.map(function (i) {
				return i.response.data.success || [];
			});

			var data = [];
			items.forEach(function (items) {
				data = [].concat(_toConsumableArray(data), _toConsumableArray(items));
			});

			_this.props.handleConfirm((0, _utils.filterRepeat)(data, 'number'));
			_this.props.handleCancel();
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(_default, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    params = _props.params,
			    _props$store = _props.store,
			    store = _props$store === undefined ? {} : _props$store,
			    _props$user = _props.user,
			    user = _props$user === undefined ? {} : _props$user;
			var access_token = user.access_token;


			var action = '' + _request._API_BASE_ + store.url + '/import?' + (0, _utils.serializeParams)(_extends({ access_token: access_token }, params));

			var uploadProps = {
				name: 'file',
				multiple: true,
				action: action,
				onPreview: this.onPreview,
				fileList: this.state.fileList,
				onChange: this.onChange
			};

			return _react2.default.createElement(
				_antd.Modal,
				{
					title: 'Excel\u5BFC\u5165\u8D44\u6599',
					visible: this.props.visible,
					afterClose: this.afterClose,
					onOk: this.onOk,
					className: _style2.default.upload,
					confirmLoading: this.props.confirmLoading,
					onCancel: function onCancel() {
						return _this2.props.handleCancel();
					}
				},
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_antd.Upload,
						uploadProps,
						_react2.default.createElement(
							'div',
							{ className: 'ant-upload ant-upload-drag' },
							_react2.default.createElement(
								'span',
								{ className: 'ant-upload ant-upload-btn' },
								_react2.default.createElement(
									'div',
									{ className: 'ant-upload-drag-container' },
									_react2.default.createElement(
										'p',
										{ className: 'ant-upload-drag-icon' },
										_react2.default.createElement(_antd.Icon, { type: 'file-excel' })
									),
									_react2.default.createElement(
										'p',
										{ className: 'ant-upload-text' },
										'\u9009\u62E9\u4F60\u9700\u8981\u4E0A\u4F20\u7684Excel\u6587\u4EF6'
									),
									_react2.default.createElement(
										'p',
										{ className: 'ant-upload-hint' },
										'\u70B9\u51FB\u6587\u4EF6\u5217\u8868\u53EF\u67E5\u770B\u5BFC\u5165\u660E\u7EC6'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'p',
					{ className: 'mt20' },
					_react2.default.createElement(
						'a',
						null,
						_react2.default.createElement(_antd.Icon, { type: 'download' }),
						'\u4E0B\u8F7D\u5BFC\u5165\u6A21\u677F'
					)
				)
			);
		}
	}]);

	return _default;
}(_react.Component)) || _class) || _class) || _class);

exports.default = _default;

/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

var _mobx = __webpack_require__(8);

var _moment = __webpack_require__(28);

var _moment2 = _interopRequireDefault(_moment);

var _mobxReact = __webpack_require__(13);

var _utils = __webpack_require__(105);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
	_inherits(_default, _Component);

	function _default(props) {
		_classCallCheck(this, _default);

		var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

		_this.renderTitle = function (file) {
			if (!file || !file.response.data) return null;

			var _file$response$data = file.response.data,
			    _file$response$data$s = _file$response$data.success,
			    success = _file$response$data$s === undefined ? [] : _file$response$data$s,
			    _file$response$data$f = _file$response$data.fail,
			    fail = _file$response$data$f === undefined ? [] : _file$response$data$f;


			return _react2.default.createElement(
				'section',
				{ style: { lineHeight: 1.8 } },
				_react2.default.createElement(
					'div',
					{ className: 'flex-vcenter' },
					_react2.default.createElement(_antd.Icon, { className: 'fs14 mr5', type: 'file-text' }),
					_react2.default.createElement(
						'strong',
						{ className: 'mr10' },
						file.name
					),
					_react2.default.createElement(
						'p',
						null,
						'\u53EF\u5BFC\u5165\u6570\u91CF\u4E3A',
						_react2.default.createElement(
							'span',
							{ style: { color: '#108ee9' } },
							success.length
						)
					),
					', \u5176\u4E2D',
					_react2.default.createElement(
						'span',
						{ style: { color: '#f04134' } },
						fail ? fail.length : 0
					),
					'\u4E2A\u4E0D\u53EF\u5BFC\u5165'
				),
				fail && fail.length > 0 && _react2.default.createElement(
					'div',
					{ className: 'flex' },
					_react2.default.createElement(
						'div',
						{ style: { color: '#f04134' } },
						'\u4E0D\u53EF\u5BFC\u5165\u8D27\u54C1\uFF1A'
					),
					_react2.default.createElement(
						'div',
						{ className: 'flex' },
						_react2.default.createElement(
							'p',
							null,
							'...'
						)
					)
				)
			);
		};

		_this.columns = (0, _utils.computeColumns)(props.columns);
		return _this;
	}

	_createClass(_default, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    dataSource = _props.dataSource,
			    file = _props.file;

			dataSource.forEach(function (i, index) {
				return i.key = i.id || index;
			});

			return _react2.default.createElement(_antd.Table, {
				size: 'small',
				bordered: true,
				scroll: { x: (0, _utils.getXSrcoll)(this.columns), y: 600 },
				dataSource: dataSource,
				title: function title() {
					return _this2.renderTitle(file);
				},
				columns: this.columns
			});
		}
	}]);

	return _default;
}(_react.Component), _class2.defaultProps = {
	columns: [],
	dataSource: []
}, _temp)) || _class;

exports.default = _default;

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(446);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(39)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(38)(true);
// imports


// module
exports.push([module.i, ".style-upload__2AYFg .ant-upload.ant-upload-select {\n  display: block;\n}\n.style-upload__2AYFg .ant-upload-list-item-info {\n  cursor: pointer;\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Desktop/dyun/auto-store/app/components/Upload/style.less"],"names":[],"mappings":"AAAA;EACE,eAAe;CAChB;AACD;EACE,gBAAgB;CACjB","file":"style.less","sourcesContent":[".upload :global .ant-upload.ant-upload-select {\n  display: block;\n}\n.upload :global .ant-upload-list-item-info {\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"upload": "style-upload__2AYFg"
};

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

var _request = __webpack_require__(35);

var _mobxReact = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Complete = (0, _mobxReact.observer)(_class = function (_React$Component) {
	_inherits(Complete, _React$Component);

	function Complete() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		_classCallCheck(this, Complete);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Complete.__proto__ || Object.getPrototypeOf(Complete)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			dataSource: []
		}, _this.getData = function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

				var _ref3, data;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _request.get)('/api/skus/search', { query: query });

							case 2:
								_ref3 = _context.sent;
								data = _ref3.data;

								_this.setState({
									dataSource: data.map(function (item) {
										return _extends({ value: item.id, text: item.name }, item);
									})
								});

							case 5:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this2);
			}));

			return function () {
				return _ref2.apply(this, arguments);
			};
		}(), _this.handleSearch = function (value) {
			_this.getData(value);
		}, _this.onSelect = function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
				var _this$state$dataSourc, id, _ref5, data;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_this$state$dataSourc = _this.state.dataSource.find(function (item) {
									return item.value == value;
								}), id = _this$state$dataSourc.id;
								_context2.next = 3;
								return (0, _request.get)('/api/skus/detail', { id: id });

							case 3:
								_ref5 = _context2.sent;
								data = _ref5.data;

								_this.props.onChange(data);

							case 6:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, _this2);
			}));

			return function (_x2) {
				return _ref4.apply(this, arguments);
			};
		}(), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Complete, [{
		key: 'componentDidMount',
		value: function () {
			var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								this.getData();

							case 1:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function componentDidMount() {
				return _ref6.apply(this, arguments);
			}

			return componentDidMount;
		}()
	}, {
		key: 'render',
		value: function render() {
			var dataSource = this.state.dataSource;
			var disabled = this.props.disabled;


			return _react2.default.createElement(_antd.AutoComplete, {
				dataSource: dataSource,
				style: _extends({ width: 200, margin: '0 10px' }, this.props.style),
				onSelect: this.onSelect,
				disabled: disabled,
				onSearch: this.handleSearch,
				placeholder: '\u641C\u7D22\u5546\u54C1\u6DFB\u52A0'
			});
		}
	}]);

	return Complete;
}(_react2.default.Component)) || _class;

exports.default = Complete;

/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _CreateTable = __webpack_require__(449);

var _CreateTable2 = _interopRequireDefault(_CreateTable);

var _antd = __webpack_require__(6);

var _mobxReact = __webpack_require__(13);

var _utils = __webpack_require__(61);

var _request = __webpack_require__(35);

var _Upload = __webpack_require__(443);

var _Upload2 = _interopRequireDefault(_Upload);

var _CreateFormItem = __webpack_require__(450);

var _CreateFormItem2 = _interopRequireDefault(_CreateFormItem);

var _ColligatePopover = __webpack_require__(152);

var _ColligatePopover2 = _interopRequireDefault(_ColligatePopover);

var _moment = __webpack_require__(28);

var _moment2 = _interopRequireDefault(_moment);

var _CreateHearder = __webpack_require__(451);

var _CreateHearder2 = _interopRequireDefault(_CreateHearder);

var _style = __webpack_require__(452);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return function (WrappedComponent) {
		var _dec, _class;

		var url = options.url,
		    _options$setFields = options.setFields,
		    setFields = _options$setFields === undefined ? [] : _options$setFields;


		return _dec = _antd.Form.create(), _dec(_class = function (_React$Component) {
			_inherits(_class, _React$Component);

			function _class(props) {
				var _this2 = this;

				_classCallCheck(this, _class);

				var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

				_this.cb = function () {
					_this.props.body.remove(_this.props.pathname, _this.props.push);
					_this.props.backStore.getData();
				};

				_this.addItems = function () {
					var newItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

					var data = (0, _utils.filterRepeat)([].concat(_toConsumableArray(_this.state.items), _toConsumableArray(newItems)), 'id');
					_this.setState({
						items: data
					});
				};

				_this.onConfirmPopover = function (record, type) {
					if (!record || !type) return;

					var name = record.name,
					    number = record.number,
					    id = record.id;
					/* eslint-disable */

					switch (type) {
						case 'supplier':
							_this.props.form.setFieldsValue({
								supplierName: name,
								supplierNumber: number,
								supplierId: id
							});
							break;
						case 'warehouse':
							_this.props.form.setFieldsValue({
								warehouseName: name,
								warehouseNumber: number,
								warehouseId: id
							});
							break;
						case 'toWarehouse':
							_this.props.form.setFieldsValue({
								toWarehouseName: name,
								toWarehouseNumber: number,
								toWarehouseId: id
							});
							break;
						case 'fromWarehouse':
							_this.props.form.setFieldsValue({
								fromWarehouseName: name,
								fromWarehouseNumber: number,
								fromWarehouseId: id
							});
							break;
						default:
							break;
						/* eslint-enable */
					}
				};

				_this.handleSubmit = function () {
					var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(pass) {
						return regeneratorRuntime.wrap(function _callee2$(_context2) {
							while (1) {
								switch (_context2.prev = _context2.next) {
									case 0:
										_context2.next = 2;
										return new Promise(function (reslove, reject) {
											_this.props.form.validateFields(function () {
												var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, values) {
													var result;
													return regeneratorRuntime.wrap(function _callee$(_context) {
														while (1) {
															switch (_context.prev = _context.next) {
																case 0:
																	if (err) {
																		_context.next = 21;
																		break;
																	}

																	Object.keys(values).forEach(function (key) {
																		if (_moment2.default.isMoment(values[key])) values[key] = (0, _moment2.default)(values[key]).valueOf();
																	});

																	if (!(_this.state.items.length == 0)) {
																		_context.next = 4;
																		break;
																	}

																	return _context.abrupt('return', reject(_antd.Modal.error({
																		title: '货品数据不能为空!'
																	})));

																case 4:
																	if (!_this.state.items.some(function (item) {
																		return !item.amount;
																	})) {
																		_context.next = 6;
																		break;
																	}

																	return _context.abrupt('return', reject(_antd.Modal.error({
																		title: '货品数量填写有误!'
																	})));

																case 6:
																	result = _extends({}, values, {
																		id: _this.id,
																		items: _this.state.items
																	});


																	pass(result);

																	_context.prev = 8;
																	_context.t0 = reslove;
																	_context.next = 12;
																	return _this.create(result);

																case 12:
																	_context.t1 = _context.sent;
																	(0, _context.t0)(_context.t1);
																	_context.next = 19;
																	break;

																case 16:
																	_context.prev = 16;
																	_context.t2 = _context['catch'](8);

																	reject();

																case 19:
																	_context.next = 22;
																	break;

																case 21:
																	reject();

																case 22:
																case 'end':
																	return _context.stop();
															}
														}
													}, _callee, _this2, [[8, 16]]);
												}));

												return function (_x4, _x5) {
													return _ref2.apply(this, arguments);
												};
											}());
										});

									case 2:
										return _context2.abrupt('return', _context2.sent);

									case 3:
									case 'end':
										return _context2.stop();
								}
							}
						}, _callee2, _this2);
					}));

					return function (_x3) {
						return _ref.apply(this, arguments);
					};
				}();

				_this.getData = function () {
					var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
						return regeneratorRuntime.wrap(function _callee3$(_context3) {
							while (1) {
								switch (_context3.prev = _context3.next) {
									case 0:
										_context3.next = 2;
										return (0, _request.get)(_this.props.backStore.url + '/detail', { id: id });

									case 2:
										return _context3.abrupt('return', _context3.sent);

									case 3:
									case 'end':
										return _context3.stop();
								}
							}
						}, _callee3, _this2);
					}));

					return function (_x6) {
						return _ref3.apply(this, arguments);
					};
				}();

				_this.create = function () {
					var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query) {
						return regeneratorRuntime.wrap(function _callee4$(_context4) {
							while (1) {
								switch (_context4.prev = _context4.next) {
									case 0:
										_context4.next = 2;
										return (0, _request.post)(_this.props.backStore.url + '/' + (!_this.id ? 'create' : 'update'), query, { id: _this.id });

									case 2:
										return _context4.abrupt('return', _context4.sent);

									case 3:
									case 'end':
										return _context4.stop();
								}
							}
						}, _callee4, _this2);
					}));

					return function (_x7) {
						return _ref4.apply(this, arguments);
					};
				}();

				_this.handleIpuntChange = function (field, record, e) {
					var items = _this.state.items;

					record[field] = (typeof e === 'undefined' ? 'undefined' : _typeof(e)) !== 'object' ? e : e.target.value;
					_this.setState({ items: items });
				};

				_this.deleteItem = function (record) {
					// const items = this.state.items.filter(i => i !== record);
					_this.setState({
						items: _this.state.items.filter(function (i) {
							return i !== record;
						})
					});
				};

				_this.update = function () {
					_this.setState({});
				};

				_this.id = _this.props.params.id;

				var getFieldDecorator = props.form.getFieldDecorator;

				_this.BindedFormItem = function (_ref5) {
					var children = _ref5.children,
					    rest = _objectWithoutProperties(_ref5, ['children']);

					return _react2.default.cloneElement(_react2.default.createElement(
						_CreateFormItem2.default,
						null,
						children
					), _extends({ getFieldDecorator: getFieldDecorator }, rest));
				};
				_this.RenderUpload = function (_ref6) {
					var children = _ref6.children,
					    rest = _objectWithoutProperties(_ref6, ['children']);

					return _react2.default.cloneElement(_react2.default.createElement(
						_Upload2.default,
						null,
						children
					), _extends({
						handleConfirm: _this.addItems,
						url: _this.props.backStore.url
					}, rest));
				};

				_this.RenderCreateTable = function (props) {
					return _react2.default.cloneElement(_react2.default.createElement(_CreateTable2.default, null), _extends({
						deleteItem: _this.deleteItem,
						handleIpuntChange: _this.handleIpuntChange,
						items: _this.state.items
					}, props));
				};

				_this.state = {
					items: [],
					ready: true
				};

				_this.sequenceField = _this.props.params.id ? _react2.default.createElement(
					this.BindedFormItem,
					{ label: '\u5355\u53F7', keyValue: 'sequence' },
					_react2.default.createElement(_antd.Input, { style: { width: 200 }, disabled: true })
				) : null;

				var pointerNode = function pointerNode() {
					var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					return _react2.default.createElement(_antd.Input, _extends({ className: _style2.default.pointer, suffix: _react2.default.createElement(_antd.Icon, { type: 'ellipsis' }), readOnly: true, style: { width: 200 } }, props));
				};
				// ============================================================
				_this.WarehouseFormItem = function (_ref7) {
					var _ref7$label = _ref7.label,
					    label = _ref7$label === undefined ? '仓库编号及名称' : _ref7$label,
					    _ref7$BottomNode = _ref7.BottomNode,
					    BottomNode = _ref7$BottomNode === undefined ? null : _ref7$BottomNode,
					    value = _ref7.value,
					    props = _ref7.props;
					return (
						// <ColligatePopover title="请选择仓库" selectedRowKeys={[value]} api="api/warehouses/search" radio onChange={(_, selectedRows) => this.onConfirmPopover(selectedRows[0], 'warehouse')}>
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'warehouseId' }),
							_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'warehouseName' }),
							_react2.default.createElement(
								_ColligatePopover2.default,
								{ title: '\u8BF7\u9009\u62E9\u4ED3\u5E93', selectedRowKeys: [value], dataType: 'warehouseData', radio: true, onChange: function onChange(_, selectedRows) {
										return _this.onConfirmPopover(selectedRows[0], 'warehouse');
									} },
								_react2.default.createElement(
									_this2.BindedFormItem,
									{ BottomNode: BottomNode, label: label, rules: true, keyValue: 'warehouseNumber' },
									pointerNode(props)
								)
							)
						)
					);
				};

				// ============================================================
				_this.ToWarehouseFormItem = function (_ref8) {
					var _ref8$label = _ref8.label,
					    label = _ref8$label === undefined ? '收货仓编号及名称' : _ref8$label,
					    _ref8$BottomNode = _ref8.BottomNode,
					    BottomNode = _ref8$BottomNode === undefined ? null : _ref8$BottomNode,
					    value = _ref8.value,
					    disabledId = _ref8.disabledId;
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'toWarehouseId' }),
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'toWarehouseName' }),
						_react2.default.createElement(
							_ColligatePopover2.default,
							{ title: '\u8BF7\u9009\u62E9\u6536\u8D27\u4ED3', disabledId: disabledId, selectedRowKeys: [value], dataType: 'warehouseData', radio: true, onChange: function onChange(_, selectedRows) {
									return _this.onConfirmPopover(selectedRows[0], 'toWarehouse');
								} },
							_react2.default.createElement(
								_this2.BindedFormItem,
								{ BottomNode: BottomNode, label: label, rules: true, keyValue: 'toWarehouseNumber' },
								pointerNode()
							)
						)
					);
				};

				// ============================================================
				_this.FromWarehouseFormItem = function (_ref9) {
					var _ref9$label = _ref9.label,
					    label = _ref9$label === undefined ? '供货仓编号及名称' : _ref9$label,
					    _ref9$BottomNode = _ref9.BottomNode,
					    BottomNode = _ref9$BottomNode === undefined ? null : _ref9$BottomNode,
					    value = _ref9.value,
					    disabledId = _ref9.disabledId;
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'fromWarehouseId' }),
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'fromWarehouseName' }),
						_react2.default.createElement(
							_ColligatePopover2.default,
							{ title: '\u8BF7\u9009\u62E9\u4F9B\u8D27\u4ED3', disabledId: disabledId, selectedRowKeys: [value], dataType: 'warehouseData', radio: true, onChange: function onChange(_, selectedRows) {
									return _this.onConfirmPopover(selectedRows[0], 'fromWarehouse');
								} },
							_react2.default.createElement(
								_this2.BindedFormItem,
								{ BottomNode: BottomNode, label: label, rules: true, keyValue: 'fromWarehouseNumber' },
								pointerNode()
							)
						)
					);
				};

				// ============================================================
				_this.SupplierFormItem = function (_ref10) {
					var _ref10$label = _ref10.label,
					    label = _ref10$label === undefined ? '供应商编号及名称' : _ref10$label,
					    _ref10$BottomNode = _ref10.BottomNode,
					    BottomNode = _ref10$BottomNode === undefined ? null : _ref10$BottomNode,
					    value = _ref10.value;
					return _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'supplierId' }),
						_react2.default.createElement(_this2.BindedFormItem, { keyValue: 'supplierName' }),
						_react2.default.createElement(
							_ColligatePopover2.default,
							{ title: '\u8BF7\u9009\u62E9\u4F9B\u5E94\u5546', selectedRowKeys: [value], radio: true, dataType: 'supplierData', onChange: function onChange(_, selectedRows) {
									return _this.onConfirmPopover(selectedRows[0], 'supplier');
								} },
							_react2.default.createElement(
								_this2.BindedFormItem,
								{ BottomNode: BottomNode, label: label, rules: true, keyValue: 'supplierNumber' },
								pointerNode()
							)
						)
					);
				};
				// ============================================================

				_this.BottomNode = function (_ref11) {
					var name = _ref11.name;
					return name ? _react2.default.createElement(
						'div',
						{ className: 'ml10' },
						_react2.default.createElement(_antd.Badge, { status: 'processing' }),
						_react2.default.createElement(
							'span',
							{ style: { marginRight: 15 } },
							name
						)
					) : null;
				};

				_this.BackCreateHearder = function (props) {
					return _react2.default.cloneElement(_react2.default.createElement(
						_CreateHearder2.default,
						null,
						_this.props.name
					), _extends({
						cb: _this.cb
					}, props));
				};
				return _this;
			}

			_createClass(_class, [{
				key: 'componentWillMount',
				value: function () {
					var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
						var _this3 = this;

						var _ref13, data;

						return regeneratorRuntime.wrap(function _callee5$(_context5) {
							while (1) {
								switch (_context5.prev = _context5.next) {
									case 0:
										if (!this.id) {
											_context5.next = 8;
											break;
										}

										this.setState({ ready: false });
										_context5.next = 4;
										return (0, _request.get)(this.props.backStore.url + '/detail', { id: this.id });

									case 4:
										_ref13 = _context5.sent;
										data = _ref13.data;


										if (Array.isArray(data.items)) {
											data.items.forEach(function (item) {
												item.name = item.name || item.skuName;
												item.number = item.number || item.skuNumber;
												item.skuId = item.skuId || item.id;
											});
										}

										this.setState({
											ready: true,
											items: data.items
										}, function () {
											if (!Array.isArray(setFields)) return;
											var otherValues = {};

											Object.keys(data).forEach(function (item) {
												if (typeof data[item] == 'number' && String(data[item]).length == 13) data[item] = (0, _moment2.default)(data[item]);
											});

											setFields.forEach(function (field) {
												if (field == 'supplier') {
													otherValues.supplierId = data.supplierId;
													otherValues.supplierName = data.supplierName;
													otherValues.supplierNumber = data.supplierNumber;
												} else if (field == 'toWarehouse') {
													otherValues.toWarehouseId = data.toWarehouseId;
													otherValues.toWarehouseName = data.toWarehouseName;
													otherValues.toWarehouseNumber = data.toWarehouseNumber;
												} else if (field == 'fromWarehouse') {
													otherValues.fromWarehouseId = data.fromWarehouseId;
													otherValues.fromWarehouseName = data.fromWarehouseName;
													otherValues.fromWarehouseNumber = data.fromWarehouseNumber;
												} else if (field == 'warehouse') {
													otherValues.warehouseId = data.warehouseId;
													otherValues.warehouseName = data.warehouseName;
													otherValues.warehouseNumber = data.warehouseNumber;
												} else otherValues[field] = data[field];
											});

											_this3.props.form.setFieldsValue(_extends({
												sequence: data.sequence,
												note: data.note
											}, otherValues));
										});

									case 8:
									case 'end':
										return _context5.stop();
								}
							}
						}, _callee5, this);
					}));

					function componentWillMount() {
						return _ref12.apply(this, arguments);
					}

					return componentWillMount;
				}()
			}, {
				key: 'render',
				value: function render() {
					var _this4 = this;

					var _state = this.state,
					    ready = _state.ready,
					    items = _state.items;


					var toWarehouseField = _react2.default.createElement(this.ToWarehouseFormItem, { disabledId: this.props.form.getFieldsValue().fromWarehouseId, value: this.props.form.getFieldsValue().toWarehouseId, BottomNode: _react2.default.createElement(this.BottomNode, { name: this.props.form.getFieldsValue().toWarehouseName }) });
					var fromWarehouseField = _react2.default.createElement(this.FromWarehouseFormItem, { disabledId: this.props.form.getFieldsValue().toWarehouseId, value: this.props.form.getFieldsValue().fromWarehouseId, BottomNode: _react2.default.createElement(this.BottomNode, { name: this.props.form.getFieldsValue().fromWarehouseName }) });
					var warehouseField = _react2.default.createElement(this.WarehouseFormItem, { value: this.props.form.getFieldsValue().warehouseId, BottomNode: _react2.default.createElement(this.BottomNode, { name: this.props.form.getFieldsValue().warehouseName }) });
					var supplierField = _react2.default.createElement(this.SupplierFormItem, { value: this.props.form.getFieldsValue().supplierId, BottomNode: _react2.default.createElement(this.BottomNode, { name: this.props.form.getFieldsValue().supplierName }) });

					var stocktakingsField = function stocktakingsField(props) {
						return _react2.default.createElement(_this4.WarehouseFormItem, {
							label: '\u76D8\u70B9\u4ED3\u5E97',
							props: props,
							value: _this4.props.form.getFieldsValue().warehouseId,
							BottomNode: _react2.default.createElement(_this4.BottomNode, { name: _this4.props.form.getFieldsValue().warehouseName })
						});
					};

					return ready ? _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
						handleSubmit: this.handleSubmit,
						addItems: this.addItems,
						deleteItem: this.deleteItem,
						create: this.create,
						RenderUpload: this.RenderUpload,
						BackCreateHearder: this.BackCreateHearder,
						BindedFormItem: this.BindedFormItem,
						RenderCreateTable: this.RenderCreateTable,
						update: this.update,

						sequenceField: this.sequenceField,
						toWarehouseField: toWarehouseField,
						fromWarehouseField: fromWarehouseField,
						warehouseField: warehouseField,
						supplierField: supplierField,
						stocktakingsField: stocktakingsField
					})) : _react2.default.createElement(
						'div',
						{ className: 'flex-center', style: { height: '100%' } },
						_react2.default.createElement(
							'div',
							{ style: { marginBottom: 200 } },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement(_antd.Spin, { tip: '\u5355\u636E\u52A0\u8F7D\u4E2D...', indicator: _react2.default.createElement(_antd.Icon, { type: 'loading', style: { fontSize: 30 }, spin: true }) })
							)
						)
					);
				}
			}]);

			return _class;
		}(_react2.default.Component)) || _class;
	};
};

/***/ }),

/***/ 449:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

var _mobxReact = __webpack_require__(13);

var _mobx = __webpack_require__(8);

var _utils = __webpack_require__(105);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
|--------------------------------------------------
| handleIpuntChange: () => {};
| columns: [];
| deleteItem: () => {};  //noDelete
|--------------------------------------------------
*/

var _default = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
	_inherits(_default, _Component);

	function _default(props) {
		_classCallCheck(this, _default);

		var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this, props));

		!props.noDelete && props.columns.push({
			width: 80,
			title: '',
			key: 'delete',
			render: function render(_, record) {
				var style = {
					color: '#f04134',
					cursor: 'pointer',
					padding: 10
				};

				return _react2.default.createElement(
					_antd.Popconfirm,
					{ title: '\u786E\u5B9A\u5220\u9664?', onConfirm: function onConfirm() {
							return _this.props.deleteItem(record);
						} },
					_react2.default.createElement(
						'span',
						{ style: style },
						_react2.default.createElement(_antd.Icon, { type: 'delete' })
					)
				);
			}
		});

		_this.columns = props.columns.map(function (item) {
			if (item.edit) item.title = _react2.default.createElement(
				'div',
				null,
				item.title,
				_react2.default.createElement(_antd.Icon, { className: 'primary-6', type: 'edit' })
			);
			if (item.type == 'info') item.render = function (text) {
				return _react2.default.createElement(
					'p',
					{ className: 'info-color' },
					text
				);
			};
			return _extends({}, item, {
				dataIndex: item.key,
				render: item.render ? item.render : function (text, record) {
					if (item.edit) {
						var _item$edit = item.edit,
						    type = _item$edit.type,
						    inputProps = _objectWithoutProperties(_item$edit, ['type']);

						if (type == 'number') return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_antd.InputNumber, _extends({
								onChange: _this.props.handleIpuntChange.bind(_this, item.key, record),
								value: text,
								style: { width: 80 },
								size: 'small',
								min: 1
							}, inputProps))
						);else return _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(_antd.Input, _extends({
								style: { width: 100 },
								size: 'small',
								value: text,
								onChange: _this.props.handleIpuntChange.bind(_this, item.key, record)
							}, inputProps))
						);
					}
					return text;
				}
			});
		});
		return _this;
	}

	_createClass(_default, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var otherH = 70;
			this.tableInnerHeight = this.refs.wrap && this.refs.wrap.clientHeight - otherH;
		}
	}, {
		key: 'render',
		value: function render() {
			this.props.items.forEach(function (i, index) {
				return i.key = index;
			});
			return _react2.default.createElement(
				'div',
				{ className: 'flex-g-1', ref: 'wrap' },
				_react2.default.createElement(_antd.Table, {
					className: 'main-table',
					size: 'middle',
					scroll: { x: (0, _utils.getXSrcoll)(this.columns), y: this.tableInnerHeight || 600 },
					title: this.props.title,
					dataSource: this.props.items,
					loading: false,
					pagination: false,
					columns: this.columns })
			);
		}
	}]);

	return _default;
}(_react.Component), _class2.defaultProps = {
	columns: []
}, _temp)) || _class;

exports.default = _default;

/***/ }),

/***/ 450:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FormItem = _antd.Form.Item;

exports.default = function (_ref) {
	var getFieldDecorator = _ref.getFieldDecorator,
	    children = _ref.children,
	    label = _ref.label,
	    keyValue = _ref.keyValue,
	    rules = _ref.rules,
	    _ref$BottomNode = _ref.BottomNode,
	    BottomNode = _ref$BottomNode === undefined ? null : _ref$BottomNode,
	    _ref$onClick = _ref.onClick,
	    onClick = _ref$onClick === undefined ? function () {} : _ref$onClick,
	    rest = _objectWithoutProperties(_ref, ['getFieldDecorator', 'children', 'label', 'keyValue', 'rules', 'BottomNode', 'onClick']);

	var placeholder = '\u8BF7\u8F93\u5165' + label + (rules ? '' : '（非必填）');

	// const itmeNode = React.cloneElement(children, { placeholder, });

	return !children ? _react2.default.createElement(
		FormItem,
		{ style: { display: 'none' } },
		getFieldDecorator(keyValue, _extends({
			rules: []
		}, rest))(_react2.default.createElement('div', null))
	) : _react2.default.createElement(
		'section',
		{ className: 'mr30', style: { height: 80 } },
		_react2.default.createElement(
			'p',
			{ style: { marginBottom: 4, paddingLeft: 5 } },
			_react2.default.createElement(
				'strong',
				null,
				label
			)
		),
		_react2.default.createElement(
			FormItem,
			null,
			getFieldDecorator(keyValue, _extends({
				rules: rules ? [_extends({ required: true, message: placeholder }, rules)] : []
			}, rest))(_react2.default.cloneElement(children, { placeholder: placeholder, onClick: onClick }))
		),
		BottomNode
	);
};

/***/ }),

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _style = __webpack_require__(439);

var _style2 = _interopRequireDefault(_style);

var _antd = __webpack_require__(6);

var _mobxReact = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (0, _mobxReact.observer)(_class = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		var _ref,
		    _this2 = this;

		var _temp, _this, _ret;

		_classCallCheck(this, Header);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = { loading: false }, _this.handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
			return regeneratorRuntime.wrap(function _callee$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_this.setState({ loading: true });
							_context.prev = 1;
							_context.next = 4;
							return _this.props.handleSubmit();

						case 4:
							_this.setState({ loading: false }, function () {
								_antd.Modal.success({
									title: '操作成功！',
									onOk: _this.props.cb
								});
							});
							_context.next = 10;
							break;

						case 7:
							_context.prev = 7;
							_context.t0 = _context['catch'](1);

							_this.setState({ loading: false });

						case 10:
						case 'end':
							return _context.stop();
					}
				}
			}, _callee, _this2, [[1, 7]]);
		})), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _props = this.props,
			    children = _props.children,
			    handleSubmit = _props.handleSubmit;
			var loading = this.state.loading;

			return _react2.default.createElement(
				'header',
				{ className: _style2.default.header + ' flex-vcenter jc-between' },
				_react2.default.createElement(
					'div',
					{ className: 'flex-vcenter' },
					_react2.default.createElement(
						'h2',
						{ className: 'flex-vcenter' },
						children
					),
					_react2.default.createElement(
						_antd.Button,
						{ loading: this.state.loading, onClick: function onClick() {
								return _this3.handleSubmit();
							}, className: 'ml20', type: 'primary' },
						'\u4FDD\u5B58'
					)
				)
			);
		}
	}]);

	return Header;
}(_react.Component)) || _class;

exports.default = Header;

/***/ }),

/***/ 452:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(453);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(39)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less", function() {
			var newContent = require("!!../../../node_modules/.0.28.7@css-loader/index.js??ref--3-1!../../../node_modules/.2.0.9@postcss-loader/lib/index.js!../../../node_modules/.4.0.5@less-loader/dist/cjs.js??ref--3-3!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(38)(true);
// imports


// module
exports.push([module.i, ".style-pointer__rMMB0 input {\n  cursor: pointer;\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Desktop/dyun/auto-store/app/hoc/create-table/style.less"],"names":[],"mappings":"AAAA;EACE,gBAAgB;CACjB","file":"style.less","sourcesContent":[".pointer input {\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"pointer": "style-pointer__rMMB0"
};

/***/ })

});