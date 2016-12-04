'use strict';

const _ = require('lodash');
const gutil = require('gulp-util');
const webpack = require('webpack');
const buildWebpackConfig = require('../../../webpack.config');

module.exports = (callback) => {
  callback = _.once(callback);

  webpack(buildWebpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    callback();
  });
};
