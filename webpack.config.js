const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',

	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3001,
	},
	module: {
		rules: [
			{
				test: /\.bundle\.ts$/,
				use: {
					loader: 'bundle-loader',
					options: {
						name: '[name]',
					},
				},
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},

			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
};
