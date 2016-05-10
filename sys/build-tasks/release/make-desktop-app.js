/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const options = require('../../config');

const fse = require('fs-extra');

fse.ensureDirSync(options.DIR_NW_CACHE);
fse.ensureDirSync(options.DIR_NW_BUILD);

module.exports = (callback) => {

};
