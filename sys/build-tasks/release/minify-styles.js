/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpCssComb = require('gulp-csscomb');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');
const gulpCSSO = require('gulp-csso');

module.exports = (callback) =>
  gulp
    .src(fmap(options.DIR_RELEASED, [
      '**/*.css',
      '!node_modules/**/*'
    ]), { base: options.DIR_RELEASED })
    .pipe(gulpCssComb())
    .pipe(gulpCSSO({
      restructure: true,
      sourceMap: false,
      debug: true
    }))
    .pipe(gulp.dest(options.DIR_RELEASED));
