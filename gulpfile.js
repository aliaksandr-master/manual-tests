/*eslint-disable prefer-template*/
'use strict';

const path = require('path');
const gulpRunSequence = require('run-sequence');
const lazyTaskBuilder = require('./sys/gulp-utils/lazy-task');
const gulp = require('gulp-help')(require('gulp'), {
  description: '',
  hideEmpty: true,
  hideDepsMessage: true
});

const task = lazyTaskBuilder(gulp, path.join(__dirname, '/sys/build-tasks'));




gulp.task('default', [
  'help'
]);




gulp.task('cleanup', [
  task('cleanup/orig'),
  task('cleanup/test-cache')
]);




gulp.task('test', 'test code of the project', [
  task('test/app-scripts'),
  task('test/app-styles'),
  task('test/app-templates'),
  task('test/sys-scripts')/*,
  task('test/package')*/
]);





gulp.task('dev', 'dev server. open page in main browser', [
  task('dev/server'),
  task('dev/open-browser')
]);




gulp.task('release', 'release the project', (callback) => gulpRunSequence(
  'test',
  task('release/clean'),
  'release-part',
  [
    task('release/minify-styles'),
    task('release/minify-scripts')
  ],
  task('release/make-desktop-app'),
  callback
));




gulp.task('release-part', (callback) => gulpRunSequence(
  [
    task('release/make-bundle'),
    task('release/collect-app-files'),
    task('release/collect-api-files')
  ],
  callback
));
