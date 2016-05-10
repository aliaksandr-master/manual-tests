/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const fmap = require('../../gulp-utils/fmap');
const gulpHtmlHint = require('gulp-htmlhint');
const GulpFileCache = require('gulp-file-cache');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');

module.exports = (callback) => {
  const fileCache = new GulpFileCache(options.FILE_TEST_CACHE);
  const gitStatusFilter = gulpGitStatusFilter({ tracked: true, staged: true, enabled: options.TEST_ONLY_TRACKED });

  return gulp.src(fmap(options.DIR_SRC, [
      '**/*.html',
      '!**/*scsslint*',
      '!app.html',
      '!public-analytics.html',
      '!vendor/**/*'
    ]))
    .pipe(gitStatusFilter)
    .pipe(gulpIf(options.TEST_CACHE, fileCache.filter()))
    .pipe(gulpHtmlHint('.htmlhintrc'))
    .pipe(gulpHtmlHint.reporter())
    .pipe(gulpHtmlHint.failReporter())
    //.pipe(gulpCheckChildComponentsRequirements())
    .pipe(gulpIf(options.TEST_CACHE, fileCache.cache()));
};
