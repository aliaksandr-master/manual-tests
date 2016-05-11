/*eslint-disable*/

'use strict';

var path = require('path');
var CWD = path.normalize(__dirname + '/../run');

if (/\.exe$/.test(process.execPath)) {
  CWD = path.dirname(process.execPath);
}

exports.CWD = CWD;
