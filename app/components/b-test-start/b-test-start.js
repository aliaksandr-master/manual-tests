'use strict';

require('./b-test-start.less');
const template = require('./b-test-start.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTestStart', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTestStart',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
