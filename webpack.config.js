'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssAutoprefixer = require('autoprefixer');
const postCssSlectorNot = require('postcss-selector-not');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');
const options = require('./sys/config');
const postCssMqPacker = require('css-mqpacker');




const config = {};




config.output = {
  path: `${options.DIR_CWD}/${options.DIR_RELEASED}`,
  pathinfo: true,
  filename: '[name].js'
};




config.entry = {
  'app': [
    `${options.DIR_CWD}/${options.DIR_SRC}/index`
  ]
};




config.externals = { // See http://webpack.github.io/docs/library-and-externals.html
};




config.module = {
  noParse: [
  ],
  preLoaders: [
  ],
  loaders: [
    {
      test: /\.(?:js)(?:\?.*)?$/i,
      exclude: [
        /\/node_modules(?!\/tiny-component)\//
      ],
      loaders: [
        `babel?${[
          'presets[]=es2015',
          'presets[]=stage-3',
          'plugins[]=transform-runtime',
          `cacheDirectory=${options.DIR_BABEL_CACHE_DIR}`
        ].join('&')}`
      ]
    },
    {
      test: /\.(?:json)(?:\?.*)?$/i,
      loader: 'json'
    },
    {
      test: /\.(?:less)(?:\?.*)?$/i,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less', { publicPath: '' })
    },
    {
      test: /\.(?:eot|ttf|woff|woff2)(?:\?[a-z0-9]*)?$/i,
      loaders: [
        'url?limit=500000&name=[name]-[sha1:hash:7].[ext]'
      ]
    },
    {
      test: /\.(?:png|jpg|gif)(?:\?.*)?$/i,
      loaders: [
        'url?limit=500000&name=[name]-[sha1:hash:7].[ext]'
        // 'file?name=[name]-[sha1:hash:7].[ext]'
      ]
    },
    {
      test: /\.(?:svg)(?:\?.*)?$/i,
      loaders: [
        'url?limit=500000&name=[name]-[sha1:hash:7].[ext]'
        // 'file?name=[name]-[sha1:hash:7].[ext]'
        // 'svg-url?noquotes',
        // `svgo-loader?${JSON.stringify({ plugins: [ { removeTitle: true }, { convertColors: { shorthex: false } }, { convertPathData: false } ] })}`
        //'url?limit=7000&name=[name]-[sha1:hash:7].[ext]',
      ]
    }
  ]
};




config.resolveLoader = {
  alias: {
  }
};




config.plugins = [
  new webpack.DefinePlugin({
    __APP_VERSION__: options.__APP_VERSION__,
    __LOCAL_MODE__: options.__LOCAL_MODE__,
    __PROD_MODE__: options.__PROD_MODE__
  }),

  new webpack.optimize.DedupePlugin(),

  new webpack.optimize.OccurenceOrderPlugin(true),

  new ExtractTextPlugin('[name].css', {
    disable: true,
    allChunks: true
  }),

  new webpack.ProgressPlugin((percentage, msg) => {
    console.log(`[webpack compiling] ${(percentage * 100).toFixed(0)}% ${msg}`); // eslint-disable-line no-console
    if (percentage === 1) {
      console.log('-----------------------'); // eslint-disable-line no-console
    }
  }),

  new webpack.NoErrorsPlugin()
];




config.resolve = {
  root: options.DIR_SRC,
  moduleDirectories: [ 'node_modules' ],
  extensions: [ '', '.js' ],
  alias: {}
};




config.postcss = () => [
  postCssSlectorNot,
  postCssMqPacker,
  postCssFlexBugsFixes,
  postCssAutoprefixer({
    browsers: [
      '> 5%',
      'last 3 version',
      'IE >= 9',
      'Android >= 4',
      'Safari >= 5',
      'iOS >= 7'
    ]
  })
];




config.bail = true;
config.devtool = null;
config.cache = false;
config.debug = false;
config.watch = false;
module.exports = config;
