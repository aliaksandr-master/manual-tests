/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const arg = require('./utils/arg');
const path = require('path');
const pkg = require('../package.json');
const cfg = exports;

cfg.ENV = arg.get('target', 'dev', [ 'dev', 'prod' ]);
cfg.ENV_PROD = cfg.ENV === 'prod';
cfg.PACKAGE = pkg;
cfg.DEV_SERVER_PORT = 9000;

cfg.BUILD_APP = arg.flag('build-app', true);
cfg.BUILD_STATIC = arg.flag('build-static', false);
cfg.BUILD_PUBLIC_ANALYTICS = arg.flag('build-public-analytics', false);

cfg.TEST_CACHE = arg.flag('test-cache', true);
cfg.TEST_MODE = arg.get('test-mode', 'confidence', [ 'strict', 'confidence' ]);
cfg.TEST_ONLY_TRACKED = arg.flag('test-tracked', false);

cfg.DIR_CWD = path.resolve(__dirname, '..');
cfg.DIR_TEST_CACHE = cfg.DIR_CWD + '/.tmp/test';
cfg.FILE_TEST_CACHE = cfg.DIR_TEST_CACHE + '/file-hash-list.json';
cfg.DIR_S3_CACHE = cfg.DIR_CWD + '/.tmp/s3';
cfg.FILE_S3_CACHE = cfg.DIR_S3_CACHE + '/cache-' + cfg.ENV + '.json';
cfg.DIR_BABEL_CACHE_DIR = cfg.DIR_CWD + '/.tmp/babel';
cfg.DIR_SETTINGS_RELEASED = cfg.DIR_CWD + '/.tmp/settings-released-' + cfg.ENV;
cfg.DIR_NODE_MODULES = 'node_modules';
cfg.DIR_SRC = 'app';
cfg.DIR_SYS = 'sys';
cfg.DIR_STATIC = 'static-pages';
cfg.DIR_APP_TEST = 'app/test';
cfg.DIR_NODE_MODULES = 'node_modules';
cfg.DIR_BUILD = 'app--dev';
cfg.DIR_RELEASED = 'app--release';
cfg.DIR_DOC = 'app--docs';
cfg.REV_MANIFEST_FILE = 'rev-manifest.json';
cfg.BEM_STAT_SUF = '--bem-stat.json';
cfg.DEFAULT_AUTH_TOKEN = 'cd14452afb8bd7e410b8ce7ee4b17a2c9ba884ec';
cfg.DIR_WEBPACK = cfg.DIR_CWD + '/.tmp/webpack';
