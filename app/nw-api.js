/*eslint-disable*/
'use strict';

var fs = require('fs');

exports.allData = function () {
  return new Promise(function (resolve) {
    // console.log(fs.lstatSync('db.json'));
    // if (fs.lstatSync('db.json').isFile()) {
    //   resolve(JSON.parse(fs.readFileSync('db.json', { encoding: 'utf8' })));
    //   return;
    // }

    resolve({});
  });
};
