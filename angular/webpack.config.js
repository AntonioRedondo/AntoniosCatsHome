const fs = require('fs');
const path = require('path');
const rxPaths = require('rxjs/_esm5/path-mapping');

const postcssImports = require('postcss-import');
const autoprefixer = require('autoprefixer');
const preCss = require("precss");

const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin/*, NamedModulesPlugin, SourceMapDevToolPlugin  */ } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
// const { NamedLazyChunksWebpackPlugin/* , BaseHrefWebpackPlugin */ } = require('@angular/cli/plugins/webpack');

module.exports = {
	entry: {
		main: ["./src/js/index.ts"]
	},
	output: {
		path: path.join(process.cwd(), "dist"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js"
	},
	resolve: {
		extensions: [".js", ".json", ".ts"],
		alias: rxPaths()
	},
	resolveLoader: {
		alias: rxPaths()
	},
	node: false,
	devServer: {
		historyApiFallback: true,
		hot: true
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: "@ngtools/webpack"
			},
			{
				test: /\.htm$/,
				loader: "raw-loader"
			},
			{
				test: /\.(jpg|png|gif|woff|woff2|svg)$/,
				loader: "url-loader",
				options: {
					name: "[name].[hash:20].[ext]",
					limit: 10000
				}
			},
			{
				test: /\.scss$/,
				use: [
					"exports-loader?module.exports.toString()",
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							import: false
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [
								preCss({ extension: "scss" }),
								autoprefixer({ browsers: ["safari 9", "ie 11"] }), // https://github.com/ai/browserslist
								// assets({ loadPaths: [SRC] })
							],
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new NoEmitOnErrorsPlugin(),
		new ProgressPlugin(),
		new HotModuleReplacementPlugin(),
		// new NamedModulesPlugin(),
		// new BaseHrefWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
		new CircularDependencyPlugin({
			exclude: /(\\|\/)node_modules(\\|\/)/,
			cwd: process.cwd()
		}),
		new CopyWebpackPlugin([{
			to: "favicon.ico",
			from: "src/favicon.ico"
		}]),
		// new ExtractTextPlugin("[name].bundle.css"),
		new HtmlWebpackPlugin({
			template: "./src/index.htm",
			hash: false,
			inject: true,
			title: "Webpack App",
			chunksSortMode: "manual"
		}),
		// https://github.com/angular/angular-cli/blob/master/packages/%40angular/cli/plugins/named-lazy-chunks-webpack-plugin.ts
		// https://github.com/Independer/angular-named-lazy-chunks-webpack-plugin
		// new NamedLazyChunksWebpackPlugin() // https://github.com/Independer/angular-named-lazy-chunks-webpack-plugin,
		new AngularCompilerPlugin({
			mainPath: "./js/index.ts",
			sourceMap: true,
			tsConfigPath: "src/tsconfig2.json",
			skipCodeGeneration: true
		})
	]
};
