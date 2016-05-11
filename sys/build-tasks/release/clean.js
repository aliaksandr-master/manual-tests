/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const options = require('../../config');
const fmap = require('../../gulp-utils/fmap');

module.exports = (callback) =>
  gulp
    .src(fmap(options.DIR_RELEASED, [
      '**/*',
      '!run/**/*',
      '!node_modules/**/*'
    ]), { read: false })
    .pipe(vinylPaths(del));
