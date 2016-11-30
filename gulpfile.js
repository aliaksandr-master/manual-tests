/*eslint-disable prefer-template*/
'use strict';

const path = require('path');
const lazyTaskBuilder = require('gulp-lazy-init');
const gulp = require('gulp-help')(require('gulp'), {
  description: '',
  hideEmpty: true,
  hideDepsMessage: true
});

const task = lazyTaskBuilder(gulp, path.join(__dirname, '/sys/building'));




gulp.task('default', [
  'help'
]);




gulp.task('dev', 'dev server. open page in main browser', [
  task('dev/server'),
  task('dev/open-browser')
]);
