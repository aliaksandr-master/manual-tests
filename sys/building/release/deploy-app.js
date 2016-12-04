'use strict';

const path = require('path');
const fse = require('fs-extra');
const options = require('../../config');

module.exports = (done) => {
  fse.ensureDirSync(options.DIR_DEPLOY);
  fse.ensureDirSync(options.DIR_NW_CACHE);

  const nw = new NwBuilder({
    buildDir: options.DIR_DEPLOY,
    flavor: options.ENV === 'production' ? 'normal' : 'sdk',
    buildType: 'timestamped',
    cacheDir: options.DIR_NW_CACHE,
    files: [
      `${options.DIR_RELEASED}/**/*`
    ],
    platforms: [ 'win32'/*, 'win64'*/ ]
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
