/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulpIf = require('gulp-if');
const fmap = require('../../gulp-utils/fmap');
const GulpFileCache = require('gulp-file-cache');
const gulpCheckPackage = require('../../gulp-tasks/gulp-check-package');
const gulp = require('gulp');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');

module.exports = (callback) => {
  const fileCache = new GulpFileCache(options.FILE_TEST_CACHE);
  const gitStatusFilter = gulpGitStatusFilter({ tracked: true, staged: true, enabled: options.TEST_ONLY_TRACKED });

  return gulp
    .src(fmap(options.DIR_CWD, 'package.json'))
    .pipe(gitStatusFilter)
    .pipe(gulpIf(options.TEST_CACHE, fileCache.filter()))
    .pipe(gulpCheckPackage())
    .pipe(gulpIf(options.TEST_CACHE, fileCache.cache()));
};
