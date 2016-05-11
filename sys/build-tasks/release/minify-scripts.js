/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_RELEASED, [
    '**/*.js',
    '!node_modules/**/*'
  ]), { base: options.DIR_RELEASED })
    .pipe(gulpUglify())
    .pipe(gulp.dest(options.DIR_RELEASED));
