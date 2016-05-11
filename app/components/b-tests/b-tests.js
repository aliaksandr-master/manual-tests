'use strict';

require('./b-tests.less');
const template = require('./b-tests.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTests', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTests',

    scope: {
      tests: '='
    },

    /*@ngInject*/
    controller () {
      // const vm = this;
    }
  }));
