const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: "souce-map",
	context: path.resolve(__dirname, "src"),
	entry: ["./css/main.scss", './js/main.js'],
	output: {
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},
			{
				test: /.(scss|css)$/,
				exclude: /node_modules/,
				use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						reloadAll: true
					}
				},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'img/',
						publicPath: 'img/'
					}
				}],
			},

			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: 'url-loader',
					options: {
						name: '[name].[ext]',
						limit: 10000,
						mimetype: 'application/font-ttf',
						outputPath: 'fonts/',
						publicPath: 'fonts/'
					}
				}],
			},
		]
	},
	plugins: [
		new MinifyPlugin({}, {
			comments: false
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'img', to: 'img' },
				// { from: 'fonts', to: 'fonts' }, // enable this line only if you have 'fonts' dir under 'src'
			],
		}),
	]
};
