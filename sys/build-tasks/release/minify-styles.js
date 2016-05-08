/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpCssComb = require('gulp-csscomb');
const gulpBemStat = require('../../gulp-tasks/gulp-bem-stat');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');
const gulpCSSO = require('gulp-csso');

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_RELEASED, [ '**/*.css' ]), { base: options.DIR_RELEASED })
    .pipe(gulpCssComb())
    .pipe(gulpCSSO({
      restructure: true,
      sourceMap: false,
      debug: true
    }))
    .pipe(gulpBemStat({ suffix: options.BEM_STAT_SUF }))
    .pipe(gulp.dest(options.DIR_RELEASED));
