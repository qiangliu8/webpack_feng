var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, '../src/styles/theme.less'), 'utf8'))

exports.assetsPath = function (_path) {
	var assetsSubDirectory = process.env.NODE_ENV === 'production'
		? config.build.assetsSubDirectory
		: config.dev.assetsSubDirectory
	return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
	options = options || {}
	
	const cssLoader = {
		loader: 'css-loader',
		options:{
			sourceMap: options.sourceMap,
			minimize: process.env.NODE_ENV === 'production',
		}
	}
	const postcssLoader = {
		loader: 'postcss-loader',
		options: {
			sourceMap: options.sourceMap,
			plugins: (loader) => [
				require('autoprefixer')({
					browsers: ['iOS >= 7', 'Android >= 4.1']
				}),
				require('postcss-pxtorem')({
					rootValue: 20 / 2,
					propWhiteList: [],
			})
			]
		}
	}
	
	// generate loader string to be used with extract text plugin
	function generateLoaders (loader, loaderOptions) {
		var loaders = [cssLoader, postcssLoader]
		if (loader) {
			loaders.push({
				loader: loader + '-loader',
				options: Object.assign({}, loaderOptions, {
					sourceMap: options.sourceMap
				})
			})
		}
		
		// Extract CSS when that option is specified
		// (which is the case during production build)
		if (options.extract) {
			return ExtractTextPlugin.extract({
				use: loaders,
				fallback: 'style-loader'
			})
		} else {
			return ['style-loader'].concat(loaders)
		}
	}
	
	return {
		css: generateLoaders(),
		less: generateLoaders('less', { modifyVars: themeVariables }),
		sass: generateLoaders('sass', { indentedSyntax: true }),
		scss: generateLoaders('sass')
	}

}