'use strict';

const path = require('path');
const webpack = require('webpack');
const postCssAutoprefixer = require('autoprefixer');
const postCssSlectorNot = require('postcss-selector-not');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');
const environments = require('./sys/env.json');
const options = require('./sys/config');




const config = {};




config.output = {
  path: `${options.DIR_CWD}/${options.DIR_RELEASED}`,
  pathinfo: true,
  filename: '[name].js'
};




config.entry = {
  'index': [
    `${options.DIR_CWD}/${options.DIR_SRC}/index`
  ]
};




config.externals = { // See http://webpack.github.io/docs/library-and-externals.html
  jquery: 'jQuery'
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
        /\/node_modules\//,
        /\/vendor\/[^/]+\/lib\//
      ],
      loaders: [
        `babel?${[
          'presets[]=es2015',
          'presets[]=stage-2',
          'plugins[]=transform-runtime',
          `cacheDirectory=${options.DIR_BABEL_CACHE_DIR}`
        ].join('&')}`,
        'sm-pragma-loader'
      ]
    },
    {
      test: /\.(?:json)(?:\?.*)?$/i,
      loader: 'json'
    },
    {
      test: /\.(?:less)(?:\?.*)?$/i,
      loader: 'css!postcss!less'
    },
    {
      test: /\.(?:eot|ttf|woff|woff2)(?:\?[a-z0-9]*)?$/i,
      loaders: [
        'file?name=[name]-[sha1:hash:7].[ext]'
      ]
    },
    {
      test: /\.(?:png|jpg|gif)(?:\?.*)?$/i,
      loaders: [
        // 'url?limit=5000&name=[name]-[sha1:hash:7].[ext]'
        'file?name=[name]-[sha1:hash:7].[ext]'
      ]
    },
    {
      test: /\.(?:svg)(?:\?.*)?$/i,
      loaders: [
        // 'url?limit=5000&name=[name]-[sha1:hash:7].[ext]',
        'file?name=[name]-[sha1:hash:7].[ext]'
        // 'svg-url?noquotes',
        // `svgo-loader?${JSON.stringify({ plugins: [ { removeTitle: true }, { convertColors: { shorthex: false } }, { convertPathData: false } ] })}`
        //'url?limit=7000&name=[name]-[sha1:hash:7].[ext]',
      ]
    }
  ]
};




config.resolveLoader = {
  alias: {
    'sm-pragma-loader': path.join(__dirname, 'sys/webpack-loaders/sm-pragma-loader/sm-pragma-loader.js')
  }
};




config.plugins = [
  new webpack.DefinePlugin({
    __SENTRY_DSN_DEV__: options.__SENTRY_DSN_DEV__,
    __SENTRY_DSN_PROD__: options.__SENTRY_DSN_PROD__,
    __APP_VERSION__: options.__APP_VERSION__,
    __APP_STAMP__: options.__APP_STAMP__,
    __APP_DATE__: options.__APP_DATE__,
    __LOCAL_MODE__: options.__LOCAL_MODE__,
    __DEV_MODE__: options.__DEV_MODE__,
    __PROD_MODE__: options.__PROD_MODE__
  }),

  new webpack.optimize.DedupePlugin(),

  new webpack.optimize.OccurenceOrderPlugin(true),

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
