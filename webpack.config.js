var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
	context: __dirname + "/board/static/board/js",
	entry: "./index.js",
	output: {
		path: __dirname + "/board/static/", // + "board/static/board/js/",
		publicPath: "/static/",
		filename: "bundle-[hash].js"
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),
	],

	module: {
		loaders: [
			{test: /\.css$/, loader: "style!css!"}, //, exclude: /node_modules/, },
			{test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
		]
	}
}
