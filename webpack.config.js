var path = require('path'),
  	webpack = require('webpack'),
  	ExtractTextPlugin = require('extract-text-webpack-plugin'),
  	precss = require('precss'),
  	autoprefixer = require('autoprefixer');

module.exports = {
	devtool: process.env.WEBPACK_ENV === 'dev' ? 'eval' : 'cheap-module-source-map',
	entry: [
    'webpack-dev-server/client?http://localhost:' + (process.env.PORT || 8080),
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.js')
  ],
	output: {
		path: path.resolve(__dirname, 'build/'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-0', 'react' ]
        }
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /node_modules/,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			},
			{
				test: /\.(less|css)$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader?sourceMap', use: 'css-loader?sourceMap!postcss-loader?pack=cleaner!less-loader' })
			}
		]
	},
	plugins: ([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
      		return {
      			defaults: [ precss, autoprefixer ],
      			cleaner: [autoprefixer({
      				browsers: ['last 2 versions']
      			})]
      		};
      	}
      }
    }),
		new webpack.NoEmitOnErrorsPlugin(),
		new ExtractTextPlugin('./build.css')
	]).concat(process.env.WEBPACK_ENV === 'dev' ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [ /\.min\.js$/gi ]
		})
	]),
	stats: { colors: true },
	devServer: {
    inline: true,
		contentBase: path.resolve(__dirname, 'public/'),
		historyApiFallback: true
	}
};
