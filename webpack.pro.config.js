'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config');
const proConfig = {
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      _PRE_:'sw'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      extractComments: true,
      compress: {
        warnings: false
      }
    }),
    ...config.commonPluginsConfig,
  ]
}

module.exports = Object.assign(config.baseConfig, proConfig);