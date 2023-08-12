module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: 'standard',
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
  plugins: ['jest', 'cypress'],
	rules: {
		indent: [0, 4],
		quotes: ['error', 'single'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'no-console': 0,
		'no-unused-vars': 'warn',
		'no-tabs': 0,
		'comma-dangle': 0,
    curly: 0,
		semi: 0,
	},
};
