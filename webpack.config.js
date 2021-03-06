import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import config from './config.js'
import colors from 'colors'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import lessToJs from 'less-vars-to-js'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const modifyVars = lessToJs(fs.readFileSync(path.join(__dirname, 'assets/styles/__theme.less'), 'utf8'))

// console.info(`webpack环境：${process.env.NODE_ENV}`.cyan)

const webpackConfig = {
	entry: {
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom',
			'moment',
		],
		fongwell: [
			// path.join(__dirname, 'client/entry.tes.jsx'),
			path.join(__dirname, `${process.env.NODE_ENV !== 'production' ? 'client/entry.dev.jsx' : 'client/entry.jsx'}`)
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
			utils: path.resolve(__dirname, 'app/utils'),
			pro: path.resolve(__dirname, 'app/pro'),
			mapStore: path.resolve(__dirname, 'app/mapStore'),
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
		new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn|en-gb)$/),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			// filename: process.env.NODE_ENV !== 'production' ? '[name].min.js' : '[name].[hash:5].min.js',
			filename: '[name].min.js',
			minChunks: Infinity,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				_API_BASE_: JSON.stringify(config.apiBase)
			}
		}),
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'assets/iconfont'),
			to: path.join(__dirname, 'dist/iconfont'),
		}]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, `${process.env.NODE_ENV !== 'production' ? 'dist/index_dll.html' : 'app/index.html'}`),
			inject: true,
		}),
	],
}

if (process.env.NODE_ENV !== 'production') {
	webpackConfig.devtool = 'cheap-module-eval-source-map'
	webpackConfig.entry.fongwell = [
		'webpack/hot/dev-server',
		`webpack-dev-server/client?http://0.0.0.0:${config.port}`,
		// 'webpack/hot/only-dev-server',
		...webpackConfig.entry.fongwell
	]
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
	webpackConfig.plugins.push(new webpack.DllReferencePlugin({
		context: __dirname,
		manifest: path.join(__dirname, 'dist/manifest.json'),
	}))
	webpackConfig.module.rules = [

		...webpackConfig.module.rules,

		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader', 'postcss-loader']
		},

		{
			test: /\.(less)$/,
			include: [
				path.resolve(__dirname, 'app'),
			],
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
				'postcss-loader',
				{
					loader: 'less-loader',
					options: {
						modifyVars,
						paths: [
							path.resolve(__dirname, 'node_modules'),
							path.resolve(__dirname, 'assets'),
						],
					},
				},
			]
		},

		{
			test: /\.(less)$/,
			exclude: [
				path.resolve(__dirname, 'app'),
			],
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'less-loader',
					options: {
						modifyVars,
					}
				}
			]
		},

	]
} else {
	// optimize-css-assets-webpack-plugin与ModuleConcatenationPlugin
	// 进一步减小css和js打包后文件的体积  local: reduce ~ 30kb ~ 50kb
	// 																	prod: reduce ~ 10kb
	// ============================================================
	// webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
	// 	cssProcessorOptions: {
	// 		discardComments: {
	// 			removeAll: true
	// 		}
	// 	},
	// 	canPrint: true
	// }))
	// webpackConfig.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
	// ============================================================
	webpackConfig.plugins.push(new ExtractTextPlugin('styles.[hash:5].min.css'))
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false,
		},
		compress: {
			warnings: false
		}
	}))
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
	// webpackConfig.output.publicPath='/assets/';
	webpackConfig.output.filename = '[name].[hash:5].min.js'
	webpackConfig.output.chunkFilename = 'core/[name].[chunkhash:5].min.js'

	webpackConfig.module.rules = [

		...webpackConfig.module.rules,

		{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: { minimize: true, }
				},
				'postcss-loader'
				]
			})
		},

		{
			test: /\.(less)$/,
			include: [
				path.resolve(__dirname, 'app'),
			],
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
				{
					loader: 'less-loader',
					options: {
						modifyVars,
						paths: [
							path.resolve(__dirname, 'node_modules'),
							path.resolve(__dirname, 'assets'),
						],
					}
				}],
			}),
		},

		{
			test: /\.(less)$/,
			exclude: [
				path.resolve(__dirname, 'app'),
			],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
						loader: 'css-loader',
						options: { minimize: true }
					},
					// 开启'postcss-loader', 会增打生产环境下css的大小 270kb ===> 340kb
					// 'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							modifyVars
						}
					}],
			}),
		}
	]
}

export default webpackConfig
