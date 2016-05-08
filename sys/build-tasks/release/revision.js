/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const del = require('del');
const gulpRev = require('gulp-rev');
const vinylPaths = require('vinyl-paths');
const gulpRename = require('gulp-rename');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_RELEASED, [ '**/*.{js,css}' ]), { base: options.DIR_RELEASED })
    .pipe(vinylPaths(del))
    .pipe(gulpRev())
    .pipe(gulpRename((path) => {
      path.basename = path.basename.replace(/-([^-]+)$/, '.$1'); // for server format

      return path;
    }))
    .pipe(gulp.dest(options.DIR_RELEASED))
    .pipe(gulpRev.manifest())
    .pipe(gulp.dest(options.DIR_RELEASED));
