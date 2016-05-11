/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const options = require('../../config');
const fmap = require('../../gulp-utils/fmap');

let files = fmap(options.DIR_SRC,  [
  'app.html',
  'server.js'
]);

files = files.concat([ 'package.json' ]);

module.exports = (callback) =>
  gulp
    .src(files)
    .pipe(gulp.dest(options.DIR_RELEASED));
