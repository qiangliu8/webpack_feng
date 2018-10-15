module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	// https://github.com/standard/standard/blob/master/docs/RULES-en.md
	extends: ["eslint:recommended", "plugin:react/recommended"],
	
	plugins: [
		'react'
	],
	
	// add your custom rules here
	'rules': {
		"react/prop-types": 0,
		// 要求generator 函数内有 yield
		"require-yield":0,
		'no-duplicate-imports': 2,
		'import/no-duplicates': 0,
		'react/no-deprecated': 1,
		'no-undef': 0,
		'no-unused-vars': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	}
}