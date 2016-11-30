'use strict';

const _ = require('lodash');
const arg = require('./utils/arg');
const path = require('path');
const pkg = require('../package.json');
const environments = require('./env.json');

exports.ENV = arg.get('target', environments.LOCAL, _.values(environments));
exports.PACKAGE = pkg;
exports.DEV_SERVER_PORT = 9001;
exports.DEV_SERVER_HOST = 'localhost';
exports.DEV_URL = `http://${exports.DEV_SERVER_HOST}:${exports.DEV_SERVER_PORT}/`;

exports.DIR_CWD = path.resolve(__dirname, '..');
exports.DIR_BABEL_CACHE_DIR = `${exports.DIR_CWD}/.tmp/babel`;
exports.DIR_SRC = 'app';
exports.DIR_SYS = 'sys';
exports.DIR_RELEASED = '.tmp/build';
exports.DEBUG_MODE = exports.ENV !== environments.PROD;

// provide into code
exports.__APP_VERSION__ = JSON.stringify(exports.PACKAGE.version);
exports.__LOCAL_MODE__ = exports.ENV === environments.LOCAL;
exports.__DEV_MODE__ = exports.ENV === environments.DEV01 || exports.ENV === environments.DEV02;
exports.__PROD_MODE__ = exports.ENV === environments.PROD;
