var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'webapp/build')
var APP_DIR = path.resolve(__dirname, 'src')
var PROD = false;

var config = {
  entry: APP_DIR + '/App.jsx',
  output: {
    path: BUILD_DIR,
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : [],
  devServer: {
    contentBase: 'webapp', // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 4000, // Port Number
    host: '0.0.0.0' // Change to '0.0.0.0' for external facing server
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.(css|scss)/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=25000'
      }
    ]
  }
}

module.exports = config