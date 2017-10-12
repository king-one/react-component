'use strict';
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devConfig = {
  devServer: {
    contentBase: path.resolve(__dirname),
    port: 3001
  },
  devtool: '#eval-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3001/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': 'true',
      _PRE_:'"sw"'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.commonPluginsConfig,
        new OpenBrowserPlugin({
      url: 'http://localhost:3001/'
    })
  ]
};
module.exports = Object.assign(config.baseConfig, devConfig);