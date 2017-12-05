import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
	entry: {
		dyun: [
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
		filename: '[name].dll.js',
		path: path.join(__dirname, 'dist'),
		library: '[name]'
	},

	plugins: [
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

if (process.env.NODE_ENV === 'production') {
	webpackConfig.plugins.push(new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}
	}));
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		output: {
			comments: false,
		},
		compress: {
			warnings: false
		}
	}));
}

export default webpackConfig;
