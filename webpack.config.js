const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Always enabled plugins
const plugs = [
  new ExtractTextPlugin('_bundle.css')
];

// Production only plugins
const prod = [
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
];

module.exports = {
  context: `${__dirname}/static`,
  entry: './main.js',
  output: {
    path: `${__dirname}/public/build`,
    publicPath: '/build/',
    filename: '_bundle.js'
  },
  devtool: 'source-map',
  plugins: process.env.NODE_ENV !== 'production' ? plugs : plugs.concat(prod),
  module: {
    loaders: [
      { test: /\.png$/, loader: 'file?name=static/[hash].[ext]' },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=static/[hash].[ext]' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.scss$/, loader: 'style!css!postcss!sass' },
      { test: /\.styl$/, loader: 'style!css!postcss!stylus' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'stage-3', 'react'] }
      }
    ]
  },
  postcss: ()/*: Array<Object>*/ => [autoprefixer]
};
