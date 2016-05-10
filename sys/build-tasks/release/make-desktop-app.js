/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const options = require('../../config');
const NwBuilder = require('nw-builder');
const fmap = require('../../gulp-utils/fmap');

module.exports = (callback) => {
  const nw = new NwBuilder({
    files: fmap(options.DIR_CWD, [
      'package.json',
      options.DIR_RELEASED + '/**/*'
    ]),
    buildDir: options.DIR_NW_BUILD,
    cacheDir: options.DIR_NW_CACHE,
    platforms: [ 'linux64' ],
    version: '0.12.3'
  });

  nw.on('log', (...args) => console.log(...args));

  return nw.build()
    .then(() => {
      console.log('all done!');
    })
    .catch((error) => {
      console.error(error);

      return Promise.reject(error);
    });
};
