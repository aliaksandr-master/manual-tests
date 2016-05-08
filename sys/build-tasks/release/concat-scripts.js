/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const gulpConcat = require('../../gulp-tasks/gulp-concat');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_SRC, '**/*.concat-json'))
    .pipe(gulpConcat())
    .pipe(gulpRename((filePath) => {
      filePath.extname = '';
    }))
    .pipe(gulp.dest(options.DIR_RELEASED));
