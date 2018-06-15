'use strict';
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const devConfig = {
  devServer: {
    host: '0.0.0.0', // 127.0.0.1 只能本地访问，换成0.0.0.0即可
    contentBase: path.resolve(__dirname),
    port: 810
  },
  devtool: 'eval-source-map', //#eval-source-map
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:810/'
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
      url: 'http://localhost:810/'
    })
  ]
};
module.exports = Object.assign(config.baseConfig, devConfig);