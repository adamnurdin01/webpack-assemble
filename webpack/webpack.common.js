const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const pages = [];
const jsonData = {};
const files = fs.readdirSync('./src/html/pages/');

files.map((x)=>{
	pages.push(x.replace('.hbs',''));
});

pages.map(function(x){
	try{
		jsonData[x] = require('../src/json/'+ x +'.json')
	}catch(err){}
});

module.exports = {
	entry: {
		app: Path.resolve(__dirname, '../src/scripts/index.js')
	},
	output: {
		path: Path.join(__dirname, '../build'),
		filename: 'js/[name].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: false
		}
	},
	plugins: [
		new CleanWebpackPlugin(['build'], { root: Path.resolve(__dirname, '..') }),
		new CopyWebpackPlugin([
			{ from: Path.resolve(__dirname, '../public'), to: 'public' },
			{ from: Path.resolve(__dirname, '../assets'), to: 'assets' }
		]),
		...pages.map(function(x){
			return new HtmlWebpackPlugin({
				template: Path.resolve(__dirname, '../src/html/pages/'+ x +'.hbs'),
				filename: x + '.html',
				minify: false
			})
		})
	],
	resolve: {
		alias: {
			'~': Path.resolve(__dirname, '../src')
		}
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto'
			},{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]'
					}
				}
			},
			{
				test: /\.hbs$/,
				use: [
					{ loader: 'html-loader' },
						{
							loader: 'assemble-webpack-loader',
							options: {
							layouts: Path.resolve(__dirname, '../src/html/layouts/**/*.hbs'),
							partials: Path.resolve(__dirname, '../src/html/partials/**/*.hbs'),
							define: jsonData
						}
					}
				]
			}
		]
	}
};
