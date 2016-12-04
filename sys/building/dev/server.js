'use strict';

const _ = require('lodash');
const express = require('express');
const fse = require('fs-extra');
const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../../webpack.config');
const options = require('../../config');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const devServerConfig = {
  host: options.DEV_SERVER_HOST,
  port: options.DEV_SERVER_PORT,

  watch: true,
  hot: true,
  inline: true,

  quiet: false,
  noInfo: true,
  stats: { colors: true },
  historyApiFallback: false,
  contentBase: webpackConfig.output.path/*,
   publicPath: path.join(options.DIR_CWD, options.DIR_SRC)*/
};

webpackConfig.bail = false;
webpackConfig.devtool = 'source-map';
webpackConfig.cache = true;
webpackConfig.debug = true;
webpackConfig.watch = true;

webpackConfig.plugins.splice(webpackConfig.plugins.length - 2, 0, new webpack.HotModuleReplacementPlugin());

_.each(webpackConfig.entry, (entry) => {
  entry.unshift(
    'webpack-hot-middleware/client?timeout=2000&overlay=true&reload=true&quiet=true'
  );
});

module.exports = (callback) => {
  fse.ensureDirSync(options.DIR_BABEL_CACHE_DIR);

  const app = express();

  // app.use(morgan('short'));

  const compiler = webpack(webpackConfig);

  app.use(WebpackDevMiddleware(compiler, devServerConfig));
  app.use(WebpackHotMiddleware(compiler));

  app.get('*', express.static(`${options.DIR_CWD}/${options.DIR_SRC}`));

  app.listen(devServerConfig.port, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // Server listening
    gutil.log('[webpack-dev-server]', `'http://${devServerConfig.host}:${devServerConfig.port}/`);

    // keep the server alive or continue?
    callback();
  });
};
