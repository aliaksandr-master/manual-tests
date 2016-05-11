'use strict';

require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

require('./styles/index.less');
const appMainMdl = require('./states/app.main');
const appQuestionFormMdl = require('./states/app.question-form');
const appQuestionsMdl = require('./states/app.questions');
const appTestMdl = require('./states/app.test');
const appTestQuestionMdl = require('./states/app.test.question');
const appTestResultMdl = require('./states/app.test.result');
const appTestStartMdl = require('./states/app.test.start');
const appTestFormMdl = require('./states/app.test-form');
const appTestsMdl = require('./states/app.tests');

angular
  .module('mt.app', [
    appMainMdl,
    appQuestionFormMdl,
    appQuestionsMdl,
    appTestMdl,
    appTestQuestionMdl,
    appTestResultMdl,
    appTestStartMdl,
    appTestFormMdl,
    appTestsMdl
  ])

  /*@ngInject*/
  .config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/main');
  });
