/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const url = require('url');
const gulp = require('gulp');
const gulpOpen = require('gulp-open');
const options = require('../../config');

module.exports = (callback) => {
  const query = {
    env: options.ENV,
    token: options.DEFAULT_AUTH_TOKEN
  };

  if (options.PROXY_ENABLED) {
    query.proxy = options.PROXY_PORT;
  }

  const urlParams = url.parse('http://localhost:' + options.DEV_SERVER_PORT + '/app--web.html');

  return gulp.src([
    options.DIR_SRC + '/app--web.html'
  ], { read: false })
    .pipe(gulpOpen({ uri: url.format(urlParams) }));
};
