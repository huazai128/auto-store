import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import pkg from './package.json';


const modifyVars = {
	// '@primary-color': '#5cdbd3',
	'@font-size-base': '12px',
	'@table-header-bg': '#f5f9fd',
	'@modal-mask-bg': 'rgba(0, 0, 0, 0.2)',
	'@form-item-margin-bottom': '22px',
	'@icon-url': JSON.stringify('/iconfont/iconfont'), // 把 iconfont 地址改到本地
	'@animation-duration-slow': '.2s'
};

console.info(`当前环境：${process.env.NODE_ENV}`);

const webpackConfig = {
	entry: {
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom',
			// 'moment',
		],
		fongwell: [
			'babel-polyfill',
			path.join(__dirname, 'client/entry.dev.jsx')
		]
	},
	output: {
		filename: 'entry.[name].js',
		chunkFilename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
	},

	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'app')
		],
		// modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
		extensions: ['.json', '.jsx', '.web.js', '.js',],
		alias: {
			app: path.resolve(__dirname, 'app'),
			view: path.resolve(__dirname, 'app/view'),
			components: path.resolve(__dirname, 'app/components'),
			assets: path.resolve(__dirname, 'assets'),
			images: path.resolve(__dirname, 'assets/images'),
			utils: path.resolve(__dirname, 'app/utils'),

		},
	},

	module: {
		rules: [{
			test: /\.(eot|JPEG|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}],
		},
		{
			test: /\.(js|jsx)$/,
			use: ['babel-loader'],
			exclude: /node_modules/,
		}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: '[name].min.js',
			minChunks: Infinity,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'assets/iconfont'),
			to: path.join(__dirname, 'dist/iconfont'),
		}]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, `${process.env.NODE_ENV !== 'production' ? 'dist' : 'app'}/index.html`),
			inject: true,
		}),
	],
};

if (process.env.NODE_ENV !== 'production') {
	webpackConfig.devtool = 'cheap-module-eval-source-map';
	webpackConfig.entry.fongwell = [
		'webpack/hot/dev-server',
		`webpack-dev-server/client?http://${pkg.devServer.host}:${pkg.devServer.port}`,
		// 'webpack/hot/only-dev-server',
		...webpackConfig.entry.fongwell
	];
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	webpackConfig.plugins.push(new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: path.join(__dirname, 'dist/manifest.json'),
	}));
	webpackConfig.module.rules = [

		...webpackConfig.module.rules,

		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader', 'postcss-loader']
		},

		{
			test: /\.scss$/,
			exclude: /\.global.scss$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
						sourceMap: true,
						importLoaders: 1,
						localIdentName: '[name]-[local]__[hash:base64:5]'
					}
				},
				'resolve-url-loader',
				'postcss-loader',
				{
					loader: 'sass-loader',
					options: {
						includePaths: [
							path.resolve(__dirname, 'assets/styles'),
						],
					}
				},
			],
		},
		{
			test: /\.global.scss$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'sass-loader',
					options: {
						includePaths: [
							path.resolve(__dirname, 'assets/styles'),
						],
					}
				},
			],
		},
		{
			test: /\.(less)$/,
			use: [
				'style-loader',
				'css-loader',
				{
					loader: 'less-loader',
					options: {
						modifyVars
					}
				},
			]
		},
	];
} else {
	webpackConfig.plugins.push(new ExtractTextPlugin('styles.css'));
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false,
		},
		compress: {
			warnings: false
		}
	}));
	// webpackConfig.output.publicPath='/assets/';
	webpackConfig.output.filename = '[name].[hash:5].js';
	webpackConfig.output.chunkFilename = 'core/[name].[chunkhash:5].min.js';

	webpackConfig.module.rules = [

		...webpackConfig.module.rules,

		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
					}
				},
					'postcss-loader'
				]
			})
		},
		{
			test: /\.(sass|scss)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
					}
				},
					'postcss-loader',
					'sass-loader'
				],
			}),
			include: path.resolve(__dirname, 'assets')
		},
		// module css
		{
			test: /\.(sass|scss)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
						modules: true,
						importLoaders: 1,
						localIdentName: '[name]-[local]__[hash:base64:5]'
					}
				},
					'postcss-loader',
					'resolve-url-loader',
				{
					loader: 'sass-loader',
					options: {
						includePaths: [
							path.resolve(__dirname, 'assets/styles')
						],
					}
				}
				],
			}),
			include: path.resolve(__dirname, 'app')
		},
		{
			test: /\.(less)$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true
					}
				},
				{
					loader: 'less-loader',
					options: {
						modifyVars
					}
				},
				],
			}),
		}
	];
}

export default webpackConfig;
