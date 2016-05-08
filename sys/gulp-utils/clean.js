/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const _ = require('lodash');
const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');

module.exports = (files) => {
  files = _.isArray(files) ? files : [ files ];

  return gulp.src(files, { read: false }).pipe(vinylPaths(del));
};
