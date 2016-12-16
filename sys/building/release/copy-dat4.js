'use strict';

const path = require('path');
const glob = require('glob');
const fse = require('fs-extra');
const options = require('../../config');

module.exports = (callback) => {
  const datFiles = glob.sync(path.join(options.DIR_CWD, options.DIR_SRC, 'data/**/*.dat4'));

  const deployDir = glob.sync(`${exports.DIR_DEPLOY}/*`).sort().pop();

  glob.sync(`${deployDir}/*`).forEach((platformDir) => {
    const dataDir = `${platformDir}/data`;

    fse.ensureDirSync(dataDir);

    datFiles.forEach((datFile) => {
      fse.copySync(datFile, `${dataDir}/${path.basename(datFile)}`);
    });
  });

  callback();
};
