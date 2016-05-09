/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gulpNwBuilder = require('gulp-nw-builder');

const gulp = require('gulp');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

const fse = require('fs-extra');

fse.ensureDirSync(options.DIR_NW_CACHE);
fse.ensureDirSync(options.DIR_NW_BUILD);

module.exports = (callback) =>
  gulp.src(fmap(options.DIR_RELEASED, '**/*'))
    .pipe(gulpNwBuilder({
      zip: true,
      cacheDir: options.DIR_NW_CACHE,
      buildDir: options.DIR_NW_BUILD,
      buildType: 'versioned',
      version: 'v0.14.4',
      platforms: [ 'win64', 'win32', 'linux64' ]
    }))
    .pipe(gulp.dest(options.DIR_RELEASED));
