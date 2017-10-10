'use strict';
// const glob = require('glob');
const webpack = require('webpack');
const path = require('path');
// const AssetsPlugin = require('assets-webpack-plugin');  //生成资源映射表插件  jsp.php后端渲染建议使用这个插件来动态加载js和css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlPagePluginConfig = require('./htmlpage.config');
const entries = require('./entries');
const resolve = str => path.resolve(__dirname, str);
const commonPluginsConfig = [
  /*new AssetsPlugin({
    filename: 'dist/assets.js',
    processOutput: assets => 'window.WEBPACK_ASSETS=' + JSON.stringify(assets)
  }), */
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react-common',
    chunks: ['react-common']
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: Infinity
  }),
  new ExtractTextPlugin({
    filename: 'css/[name].[hash].css',
    allChunks: true
  }),
  ...htmlPagePluginConfig.plugin,
]
const baseConfig = {
  entry: Object.assign(entries, {
    'react-common': [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux'
    ]
  }),
  resolve: {
    alias: {
      '@': resolve(''),
      'components': resolve('src/components'),
      'node_modules': resolve('node_modules'),
      'pages': resolve('src/pages'),
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-2', 'stage-3'],
          plugins: ['transform-runtime', 'transform-react-jsx']
        }
      }
    },
    {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'autoprefixer-loader', 'less-loader']
      })
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
          limit: '8192'
        }
      }],
    },
    {
      test: /\.(html)$/,
      use: {
        loader: 'html-loader',
        options: {
          attrs: ['img:src'] 
        }
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]',
        }
      }],
    }]
  }
}
module.exports = {
  commonPluginsConfig,
  baseConfig
};