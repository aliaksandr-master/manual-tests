/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulp = require('gulp');
const gulpIf = require('gulp-if');
const fmap = require('../../gulp-utils/fmap');
const gulpEslint = require('gulp-eslint');
const GulpFileCache = require('gulp-file-cache');
const gulpCheckAngularComponent = require('../../gulp-tasks/gulp-check-angular-component');
const gulpGitStatusFilter = require('gulp-git-status-filter');
const options = require('../../config');

module.exports = (callback) => {

  const fileCache = new GulpFileCache(options.FILE_TEST_CACHE);
  const gitStatusFilter = gulpGitStatusFilter({ tracked: true, staged: true, enabled: options.TEST_ONLY_TRACKED });

  return gulp
    .src(fmap(options.DIR_SRC, [
      '**/*.js',
      '!**/*scsslint*',
      '!vendor/**/*'
    ]))
    .pipe(gulpIf(options.TEST_CACHE, fileCache.filter()))
    .pipe(gitStatusFilter)
    .pipe(gulpEslint(options.TEST_MODE === 'strict' ? '.eslintrc-strict.json' : '.eslintrc'))
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failAfterError())
    .pipe(gulpCheckAngularComponent())
    //.pipe(gulpCheckRequirements())
    .pipe(gulpIf(options.TEST_CACHE, fileCache.cache()));
};
