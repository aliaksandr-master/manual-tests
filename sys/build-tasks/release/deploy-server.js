/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const moment = require('moment');
const request = require('request');
const chalk = require('chalk');
const gutil = require('gulp-util');
const secret = require('../../utils/secret');
const options = require('../../config');

const API_STATIC_FILES_SETTINGS = {
  'common.js': 'COMMON_SCRIPT_VERSION',

  'app.js': 'APP_SCRIPT_VERSION',
  'app.css': 'APP_STYLES_VERSION',

  'public-analytics.js': 'PUBLIC_APP_SCRIPT_VERSION',
  'public-analytics.css': 'PUBLIC_APP_STYLES_VERSION',

  'static.css': 'STATIC_STYLES_VERSION',
  'static.js': 'STATIC_SCRIPT_VERSION'
};

module.exports = (callback) => {
  const manifestFile = path.resolve(options.DIR_CWD, options.DIR_RELEASED, options.REV_MANIFEST_FILE);
  const revManifest = JSON.parse(fs.readFileSync(manifestFile, { encoding: 'utf8' }));

  const settings = _.transform(revManifest, (settings, v, k) => {
    settings[API_STATIC_FILES_SETTINGS[k]] = v.replace(/^.+?\.([^.]+)\.[^.]+$/, '$1');
  }, {});

  const manifestFiles = _.keys(revManifest);
  const settingFiles = _.keys(API_STATIC_FILES_SETTINGS);
  const notEnoughFiles = _.difference(settingFiles, manifestFiles);
  const excessFiles = _.difference(manifestFiles, settingFiles);

  if (excessFiles.length || notEnoughFiles.length) {
    callback('invalid files number [' + notEnoughFiles.join(',') + '] [' + excessFiles.join(',') + ']');
    return;
  }

  const url = secret.get(options.ENV).settings_url;

  gutil.log('\n', 'Send to:', chalk.cyan(url), '\n');

  request.post({ url, formData: settings }, (err, httpResponse, body) => {
    if (err) {
      callback(err);
      return;
    }

    gutil.log('\n', 'Settings:', chalk.green(JSON.stringify(settings, null, 4)), '\n');

    fse.ensureDirSync(options.DIR_SETTINGS_RELEASED);

    const fileName = moment().format('YYYY-MM-DD--HH-mm-ss') + '.json';

    fs.writeFileSync(path.join(options.DIR_SETTINGS_RELEASED, fileName), JSON.stringify(settings, null, 4), { encoding: 'utf8' });

    callback();
  });
};
