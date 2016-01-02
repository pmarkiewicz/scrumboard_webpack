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
	debug: true,
	devtool: 'source-map',

	stats: {
		colors: true,
		reasons: true
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),

		// ejs compiled templates needs global _ symbol
		new webpack.ProvidePlugin({
			_: "underscore"
		})
	],

	module: {
		loaders: [
			{test: /\.css$/, loader: "style!css!"}, //, exclude: /node_modules/, },
			{test: /\.(js|es6|jsx)$/, exclude: /node_modules/, loader: 'babel?presets[]=react,presets[]=es2015'},
			{test: /\.ejs$/, loader: "ejs"}
		]
	}
}
