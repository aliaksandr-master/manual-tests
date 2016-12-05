'use strict';

const arg = require('./utils/arg');
const path = require('path');
const pkg = require('../package.json');

exports.ENV = process.env.NODE_ENV || 'development';
exports.PACKAGE = pkg;
exports.DEV_SERVER_PORT = 9001;
exports.DEV_SERVER_HOST = 'localhost';
exports.DEV_URL = `http://${exports.DEV_SERVER_HOST}:${exports.DEV_SERVER_PORT}/`;

exports.DIR_CWD = path.resolve(__dirname, '..');
exports.DIR_NW_CACHE = `${exports.DIR_CWD}/.tmp/nw-cache`;
exports.DIR_BABEL_CACHE_DIR = `${exports.DIR_CWD}/.tmp/babel`;
exports.DIR_SRC = 'app';
exports.DIR_SYS = 'sys';
exports.DIR_DEPLOY = `${exports.DIR_CWD}/.tmp/release-${exports.ENV}`;
