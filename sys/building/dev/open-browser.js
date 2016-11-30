'use strict';

const options = require('../../config');
const open = require('open');

module.exports = (callback) => {
  open(options.DEV_URL);

  callback();
};
