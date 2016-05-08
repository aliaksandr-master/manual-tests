/*eslint-disable prefer-template*/
'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postCssMqPacker = require('css-mqpacker');
const postCssAutoprefixer = require('autoprefixer');
const postCssSlectorNot = require('postcss-selector-not');

const options = require('./sys/config');
const config = {};
const DIR_CWD = options.DIR_CWD;
const isDev = !options.ENV_PROD;

fse.ensureDirSync(options.DIR_BABEL_CACHE_DIR);
fse.ensureDirSync(options.DIR_WEBPACK);

const pathToRegExp = (absPathStr) => {
  if (!fs.lstatSync(absPathStr).isFile()) {
    throw new Error('invalid file path "' + absPathStr + '"');
  }

  return new RegExp('^' + absPathStr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'));
};

config.entry = {
  app: [
    DIR_CWD + '/' + options.DIR_SRC + '/app'
  ]
};

config.output = {
  path: DIR_CWD + '/' + options.DIR_RELEASED,
  filename: '[name].js'
  // hotUpdateMainFilename: '[hash]/[name]-update.json'
};

config.module = {
  noParse: [
    /\/node_modules\/angular[^\/]*\/angular/,
    /\/node_modules\/lodash/,
    // /\/node_modules\/crypto-js\//,
    /\/node_modules\/moment/
  ],
  preLoaders: [
    {
      test: /\.js$/,
      loader: 'eslint',
      exclude: [ /\/node_modules\// ]
    }
  ],
  loaders: [
    {
      test: /\/angular\/angular\.js/,
      loader: 'exports?window.angular'
    },
    {
      test: /\.js$/i,
      exclude: [ /\/node_modules\// ],
      loaders: [
        'ng-annotate',
        'babel' +
          '?presets[]=es2015' +
          '&presets[]=stage-2' +
          '&plugins[]=transform-runtime' +
          '&cacheDirectory=' + options.DIR_BABEL_CACHE_DIR
      ]
    },
    {
      test: /\.html$/i,
      loader: 'raw!html-minify'
    },
    {
      test: /\.less/i,
      loader: ExtractTextPlugin.extract('style', 'css!postcss!less', { publicPath: '../' })
    },
    {
      test: /\.(?:eot|ttf|woff|woff2)(?:\?[a-z0-9]*)?$/i,
      loaders: [
        'file?name=[name]' + (isDev ? '' : '-[sha1:hash:7]') + '.[ext]'
      ]
    },
    {
      test: /\.(?:png|jpg|svg|gif)(?:\?.*)?$/i,
      loaders: [
        'file?name=[name]-[sha1:hash:7].[ext]',
        //'url?limit=7000&name=[name]-[sha1:hash:7].[ext]',
        'image-webpack?{bypassOnDebug: true, progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "80-90", speed: 3, verbose: false}}'
      ]
    }
  ]
};

config.watch = false;

config.plugins = [
  new webpack.NoErrorsPlugin(),

  new webpack.DefinePlugin({
    __APP_VERSION__: JSON.stringify(options.PACKAGE.version),
    __APP_DATE__: JSON.stringify(new Date()),
    __DEV_MODE__: isDev,
    __PROD_MODE__: !isDev
  }),

  new webpack.ProvidePlugin({
    'angular': path.join(DIR_CWD, 'node_modules/angular/angular.js')
  }),

  new webpack.optimize.DedupePlugin(),

  new webpack.optimize.OccurrenceOrderPlugin(true),

  new webpack.WatchIgnorePlugin([
    /\/node_modules\//
  ]),

  new ExtractTextPlugin('[name].css', {
    disable: Boolean(isDev),
    allChunks: true
  })
];

config.plugins.push(new webpack.ProgressPlugin((percentage, msg) => {
  console.log('[webpack compiling] ' + (percentage * 100).toFixed(0) + '% ' + msg);
  if (percentage === 1) {
    console.log('-----------------------');
  }
}));

config.bail = true;

config.resolve = {
  root: options.DIR_SRC,
  moduleDirectories: [ 'node_modules' ],
  extensions: [ '', '.js' ],
  alias: {}
};

config['html-minify-loader'] = {
  empty: true,
  loose: true,
  cdata: false,
  ssi: false,
  spare: false,
  quotes: false,
  conditionals: false,
  comments: false
};

config.postcss = () => [
  postCssSlectorNot,
  postCssMqPacker,
  postCssAutoprefixer({
    browsers: [
      '> 5%',
      'last 2 version',
      'IE >= 9',
      'Android >= 4',
      'Safari >= 5',
      'iOS >= 7'
    ]
  })
];

if (isDev) {
  config.devServer = {
    host: 'localhost',
    port: options.DEV_SERVER_PORT,

    watch: true,
    hot: true,
    inline: true,

    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    },
    historyApiFallback: false,
    contentBase: config.output.path
  };

  config.bail = false;
  config.cache = true;
  config.debug = true;
  config.watch = true;
  //config.devtool = '#inline-source-map';

  _.each(config.entry, (entry) => {
    entry.unshift(
      'webpack-dev-server/client?http://' + config.devServer.host + ':' + config.devServer.port,
      'webpack/hot/dev-server'
    );
  });

  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
