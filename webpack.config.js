const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		]
	},
	plugins: [
		new MinifyPlugin({}, {
			comments: false
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	]
};
