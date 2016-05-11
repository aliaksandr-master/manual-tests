/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const options = require('../../config');
const NwBuilder = require('nw-builder');
const childProcess = require('child_process');

module.exports = (callback) => {
  const command = 'cp -rf ' + options.DIR_CWD + '/node_modules ' + options.DIR_CWD + '/' + options.DIR_RELEASED + '/node_modules';

  childProcess.execSync(command);

  const nw = new NwBuilder({
    files: [
      options.DIR_CWD + '/' + options.DIR_RELEASED + '/**/*'
    ],
    zip: false,
    buildDir: options.DIR_NW_BUILD,
    cacheDir: options.DIR_NW_CACHE,
    buildType: 'default',
    platforms: [ 'linux64'/*, 'win32', 'win64'*/ ],
    appName: 'test',
    appVersion: options.PACKAGE.version,
    version: '0.12.3'
  });

  nw.on('log',  console.log);

  return nw.build().then(() => {
    console.log('all done!');
  }).catch((error) => {
    console.error(error);
  });
};
