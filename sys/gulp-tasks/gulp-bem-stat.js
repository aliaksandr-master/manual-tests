/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const through = require('through2');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

module.exports = (options) => {
  options = _.merge({
    suffix: '--bem-stat.json'
  }, options);

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    const content = file.contents.toString('utf8');

    const stat = {
      classes: {}
    };

    const addClass = ($0, $1) => {
      if (!stat.classes[$1]) {
        stat.classes[$1] = 0;
      }

      stat.classes[$1]++;
    };

    if (path.extname(file.path) === '.css') {
      content.replace(/['" \.](b-[0-9a-z-_]+)/gi, addClass);
    }

    if (path.extname(file.path) === '.js') {
      content.replace(/['" \.](b-[0-9a-z-_]+)/gi, addClass);
    }

    if (path.extname(file.path) === '.html') {
      content.replace(/['" ](b-[0-9a-z-_]+)/gi, addClass);
    }

    fs.writeFileSync(file.path + options.suffix, JSON.stringify(stat, null, 4));

    callback(null, file);
  });
};
