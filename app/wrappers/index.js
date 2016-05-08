'use strict';

const cryptoMdl = require('./crypto-js');
const lodashMdl = require('./lodash');
const momentMdl = require('./moment');
const ngTagsInputMdl = require('./ng-tags-input');
const urljsMdl = require('./urijs');
const ngAnimateMdl = require('./ng-animate');
const ngSinitizeMdl = require('./ng-sanitize');
const uiRouterMdl = require('./ui-router');
const ngTranslateMdl = require('./ng-translate');

angular
  .module('mt.wrappers', [
    ngAnimateMdl,
    ngSinitizeMdl,
    uiRouterMdl,
    ngTranslateMdl,
    cryptoMdl,
    lodashMdl,
    momentMdl,
    ngTagsInputMdl,
    urljsMdl
  ]);

module.exports = 'mt.wrappers';
