import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
	entry: {
		vendor: [
			'react',
			'react-dom',
			'react-router-dom',
			'mobx-react',
			'moment',
			'mobx',
			'antd',
		],
	},
	output: {
		filename: '[name].dev.js',
		path: path.join(__dirname, 'dist'),
		library: '[name]'
	},

	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	output: {
		// 		comments: false,
		// 	},
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		new webpack.DllPlugin({
			path: path.join(__dirname, 'dist/manifest.json'),
			name: '[name]',
			context: __dirname,
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'app/index.html'),
			inject: true,
		}),
	],
};
export default webpackConfig;
