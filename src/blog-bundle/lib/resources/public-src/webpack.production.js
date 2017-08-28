const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Merge(CommonConfig, {

    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: '/'
    },



  plugins: [

    new ExtractTextPlugin('[name].[chunkhash].css'),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      debug: true
    })
  ]
});
