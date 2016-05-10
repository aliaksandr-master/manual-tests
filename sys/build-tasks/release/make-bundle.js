/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('../../../webpack.config');
// const options = require('../../config');

module.exports = (callback) => {
  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    callback();
  });
};
