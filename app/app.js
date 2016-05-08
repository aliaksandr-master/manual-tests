'use strict';

require('./styles/index.less');

require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

const mainStateMdl = require('./states/app.main');

angular
  .module('mt.app', [
    mainStateMdl
  ])

  /*@ngInject*/
  .config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/main');
  });
