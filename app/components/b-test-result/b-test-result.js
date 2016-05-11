'use strict';

require('./b-test-result.less');
const template = require('./b-test-result.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTestResult', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTestResult',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
