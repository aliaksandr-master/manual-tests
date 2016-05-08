/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const gulpBemStat = require('../../gulp-tasks/gulp-bem-stat');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_RELEASED, [ '**/*.js' ]), { base: options.DIR_RELEASED })
    .pipe(gulpBemStat({ suffix: options.BEM_STAT_SUF }))
    .pipe(gulpUglify())
    .pipe(gulp.dest(options.DIR_RELEASED));
