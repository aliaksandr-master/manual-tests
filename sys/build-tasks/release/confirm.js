/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const inquirer = require('inquirer');
const gutil = require('gulp-util');
const options = require('../../config');

module.exports = (callback) => {
  gutil.log('ENVIRONMENT: ', gutil.colors.red(options.ENV));

  if (options.ENV !== 'prod') {
    callback();
    return;
  }

  inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: 'Are you sure?',
      default: false
    }
  ], (answers) => {
    callback(answers.confirmed ? null : new Error('unconfirmed ' + options.ENV + ' release'));
  });
};
