/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const options = require('../../config');
const fmap = require('../../gulp-utils/fmap');

module.exports = (callback) =>
  gulp
    .src(fmap(options.DIR_SRC,  [
      'api/**/*'
    ]), { base: options.DIR_SRC })
    .pipe(gulp.dest(options.DIR_RELEASED));
