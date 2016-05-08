/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const clean = require('../../gulp-utils/clean');
const fmap = require('../../gulp-utils/fmap');
const options = require('../../config');

module.exports = (callback) =>
  clean(fmap(options.DIR_CWD, [
    '**/*.orig',
    '!node_modules/**/*'
  ]));
