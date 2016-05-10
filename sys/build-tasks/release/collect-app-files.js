/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const options = require('../../config');
// const fmap = require('../../gulp-utils/fmap');

module.exports = (callback) =>
  gulp.src([
    options.DIR_SRC + '/app.html',
    'package.json'
  ])
    .pipe(gulp.dest(options.DIR_RELEASED));
