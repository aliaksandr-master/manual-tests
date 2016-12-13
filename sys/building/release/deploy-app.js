'use strict';

const path = require('path');
const fse = require('fs-extra');
const options = require('../../config');
const NwBuilder = require('nw-builder');

fse.ensureDirSync(options.DIR_DEPLOY);
fse.ensureDirSync(options.DIR_NW_CACHE);

module.exports = (done) => {
  const nw = new NwBuilder({
    buildDir: options.DIR_DEPLOY,
    flavor: options.ENV === 'production' ? 'normal' : 'sdk',
    buildType: 'timestamped',
    cacheDir: options.DIR_NW_CACHE,
    files: [
      `${options.DIR_CWD}/package.json`,
      `${options.DIR_CWD}/node_modules/**/*`,
      `${options.DIR_CWD}/${options.DIR_SRC}/**/*`,
    ],
    platforms: [ 'win32', 'win64', 'linux64' ]
  });

  nw.on('log',  console.log);

  nw.build()
    .then(function () {
      console.log('all done!');
      done();
    }, function (err) {
      console.error(err);
      done(err);
    });
};
