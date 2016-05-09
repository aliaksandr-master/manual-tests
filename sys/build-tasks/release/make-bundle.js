/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const _ = require('lodash');
const fse = require('fs-extra');
const gutil = require('gulp-util');
const webpack = require('webpack');
const config = require('../../../webpack.config');
const options = require('../../config');

module.exports = (callback) => {
  fse.ensureDirSync(options.DIR_BABEL_CACHE_DIR);
  callback = _.once(callback);

  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      // output options
    }));

    callback();
  });
};
