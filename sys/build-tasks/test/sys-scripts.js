/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const fse = require('fs-extra');
const gulpIf = require('gulp-if');
const fmap = require('../../gulp-utils/fmap');
const gulpEslint = require('gulp-eslint');
const GulpFileCache = require('gulp-file-cache');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');

module.exports = (callback) => {
  fse.ensureDirSync(options.DIR_TEST_CACHE);

  const fileCache = new GulpFileCache(options.FILE_TEST_CACHE);
  const gitStatusFilter = gulpGitStatusFilter({ tracked: true, staged: true, enabled: options.TEST_ONLY_TRACKED });

  return gulp
    .src(fmap(options.DIR_SYS, [
      '**/*.js',
      '!generators/**/*'
    ]))
    .pipe(gitStatusFilter)
    .pipe(gulpIf(options.TEST_CACHE, fileCache.filter()))
    .pipe(gulpEslint(options.TEST_MODE === 'strict' ? '.eslintrc-strict.json' : '.eslintrc'))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulpIf(options.TEST_CACHE, fileCache.cache()));
};
