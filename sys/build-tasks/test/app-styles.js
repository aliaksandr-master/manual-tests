/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulpIf = require('gulp-if');
const fmap = require('../../gulp-utils/fmap');
const gulpLessHint = require('gulp-lesshint');
const GulpFileCache = require('gulp-file-cache');
const gulpLesshintFail = require('../../gulp-tasks/gulp-lesshint-fail');
const gulp = require('gulp');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');

module.exports = (callback) => {
  const fileCache = new GulpFileCache(options.FILE_TEST_CACHE);
  const gitStatusFilter = gulpGitStatusFilter({ tracked: true, staged: true, enabled: options.TEST_ONLY_TRACKED });

  return gulp.src(fmap(options.DIR_SRC, [
      '**/*.less',
      '!**/*scsslint*',
      '!vendor/**/*'
    ]))
    .pipe(gitStatusFilter)
    .pipe(gulpIf(options.TEST_CACHE, fileCache.filter()))
    .pipe(gulpLessHint({
      configPath: '.lesshintrc'
    }))
    .pipe(gulpLessHint.reporter())
    .pipe(gulpLesshintFail())
    .pipe(gulpIf(options.TEST_CACHE, fileCache.cache()));
};
