/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const arg = require('./utils/arg');
const path = require('path');
const pkg = require('../package.json');
const fse = require('fs-extra');
const cfg = exports;

cfg.ENV = arg.get('target', 'dev', [ 'dev', 'prod' ]);
cfg.DEV_MODE = arg.get('_')[0] !== 'release';
cfg.PACKAGE = pkg;
cfg.DEV_SERVER_PORT = 9000;

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
cfg.DIR_RELEASED = 'app--build';
cfg.DIR_DOC = 'app--docs';
cfg.REV_MANIFEST_FILE = 'rev-manifest.json';
cfg.BEM_STAT_SUF = '--bem-stat.json';
cfg.DEFAULT_AUTH_TOKEN = 'cd14452afb8bd7e410b8ce7ee4b17a2c9ba884ec';
cfg.DIR_WEBPACK = cfg.DIR_CWD + '/.tmp/webpack';

cfg.DIR_NW_CACHE = cfg.DIR_CWD + '/.tmp/nw-cache';
cfg.DIR_NW_BUILD = cfg.DIR_CWD + '/app--package';

fse.ensureDirSync(cfg.DIR_BABEL_CACHE_DIR);
fse.ensureDirSync(cfg.DIR_NW_BUILD);
fse.ensureDirSync(cfg.DIR_NW_CACHE);
fse.ensureDirSync(cfg.DIR_WEBPACK);
fse.ensureDirSync(cfg.DIR_TEST_CACHE);
