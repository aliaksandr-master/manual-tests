/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const express = require('express');
const fse = require('fs-extra');
const gutil = require('gulp-util');
const webpack = require('webpack');
const gulpConcat = require('../../gulp-tasks/gulp-concat');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../../../webpack.config');
const contentPipeLineMiddlware = require('../../utils/content-pipeline-middleware');
const options = require('../../config');

module.exports = (callback) => {
  fse.ensureDirSync(options.DIR_BABEL_CACHE_DIR);

  const compiler = webpack(config);
  const webpackDevServer = new WebpackDevServer(compiler, config.devServer);
  const app = webpackDevServer.app;

  app.get(/\.html\??[^#]*#?.*$/, contentPipeLineMiddlware(options.DIR_CWD + '/' + options.DIR_SRC, [
    gulpConcat.replaceScripts
  ]));

  app.get(/^\/node_modules\//, express.static(options.DIR_CWD));

  app.get('*', express.static(options.DIR_CWD + '/' + options.DIR_SRC));

  webpackDevServer.listen(config.devServer.port, config.devServer.host, (err) => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://' + config.devServer.host + ':' + config.devServer.port + '/');

    // keep the server alive or continue?
    callback();
  });
};
