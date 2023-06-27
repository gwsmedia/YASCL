const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/yascl.js',
	externals: {
		jquery: 'jQuery'
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'yascl.js',
		library: {
			name: 'YASCL',
			type: 'var',
			export: 'default'
		}
	}
};
