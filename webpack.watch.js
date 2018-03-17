import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import config from './config.js'
import colors from 'colors'
import lessToJs from 'less-vars-to-js'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

const modifyVars = lessToJs(fs.readFileSync(path.join(__dirname, 'assets/styles/__theme.less'), 'utf8'))

const webpackConfig = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		fongwell: [
			'babel-polyfill',
			path.join(__dirname, 'client/entry.dev.jsx'),
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
		}, {
			test: /\.(js|jsx)$/,
			use: ['babel-loader'],
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader', 'postcss-loader']
		}, {
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
		}, {
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
		}]
	},
	plugins: [
		// new BrowserSyncPlugin({
		// 	host: 'localhost',
		// 	port: 8000,
		// 	files: './dist/index.html',
		// 	server: {
		// 		baseDir: './dist'
		// 	},
		// }),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: path.join(__dirname, 'dist/manifest.json'),
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				_API_BASE_: JSON.stringify(config.apiBase)
			}
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'dist/index_dll.html'),
			inject: true,
		}),
	],
}

const os = require('os')
console.log('############################################################################')
console.log(`##         os: ${os.type()} ${os.arch()} ${os.release()}`)
console.log(`##        ram: ${(os.freemem() / 1024 / 1024 / 1024) < 1
	? (os.freemem() / 1024 / 1024).toFixed(0) + 'MB'
	: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + 'GB'}`)
console.log(`##       time: ${new Date()}`)
console.log('##       info: happy days')

console.log('############################################################################')


export default webpackConfig
