/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const clean = require('../../gulp-utils/clean');
const options = require('../../config');

module.exports = (callback) =>
  clean(options.FILE_S3_CACHE);