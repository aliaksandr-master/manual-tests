'use strict';

const fs = require('fs');
const path = require('path');

exports.get = (ENV) => {
  const secretFile = path.resolve(__dirname, '../../grunt-secret.json');
  const secret = fs.readFileSync(secretFile, { encoding: 'utf8' });
  const secretSettings = JSON.parse(secret);

  return secretSettings[ENV];
};
