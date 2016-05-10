'use strict';

require('./styles/index.less');
const mainStateMdl = require('./states/app.main');

angular
  .module('mt.app', [
    mainStateMdl
  ])

  /*@ngInject*/
  .config(($urlRouterProvider) => {
    $urlRouterProvider.otherwise('/main');
  });
