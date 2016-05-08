/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const _ = require('lodash');

module.exports = (cwd, files) => {
  files = _.isArray(files) ? files : [ files ];

  return _.map(files, (file) => {
    const negative = /^!/.test(file);

    if (negative) {
      file = file.replace(/^!/, '');
    }

    return (negative ? '!' : '') + cwd.replace(/\/$/, '/') + '/' + file.replace(/^\//, '');
  });
};
