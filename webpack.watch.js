import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import config from './config.js'
import colors from 'colors'

const modifyVars = {
	'@primary-color': '#33B4DE',
	'@font-size-base': '12px',
	'@table-header-bg': '#f5f9fd',
	'@modal-mask-bg': 'rgba(0, 0, 0, 0.2)',
	'@form-item-margin-bottom': '18px',
	'@animation-duration-slow': '.2s'
}

console.info(`webpack环境：${process.env.NODE_ENV}`.cyan)

const webpackConfig = {
	// devtool: 'cheap-module-eval-source-map',
	entry: {
		fongwell: path.join(__dirname, 'client/entry.dev.jsx'),
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
		new CopyWebpackPlugin([{
			from: path.join(__dirname, 'assets/iconfont'),
			to: path.join(__dirname, 'dist/iconfont'),
		}]),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'dist/index1.html'),
			inject: true,
		}),
	],
}



export default webpackConfig
