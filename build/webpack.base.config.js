var path = require('path')
var utils = require('./utils')

var config = require('../config')

var isProduction = process.env.NODE_ENV === 'production'

var loaders = utils.cssLoaders({
	sourceMap: isProduction
		? config.build.productionSourceMap
		: config.dev.cssSourceMap,
	extract: isProduction
})

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

var configJs
switch (process.env.NODE_ENV) {
  case 'development':
    configJs = 'config/env-dev.js'
		break
	case 'tester': 
		configJs = 'config/env-tester.js'
		break
	case 'demo': 
		configJs = 'config/env-demo.js'
		break
  case 'production':
    configJs = 'config/env-prod.js'
    break
  default:
    configJs = 'config/env-dev.js'
}

module.exports = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
		modules: [
			'node_modules',
			resolve('src')
		],
		alias: {
      'config': configJs
    }
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src'), resolve('test')],
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader'
				},
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(css)$/,
				use: loaders['css']
			},
			{
				test: /\.less$/,
				use: loaders['less'],
				include: /node_modules/
			},
			{
				test: /\.scss$/,
				use: loaders['scss'].concat([{
					loader: 'sass-resources-loader',
					options:{ resources: resolve('src/styles/variable.scss') }
				}])
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		]
	}
}