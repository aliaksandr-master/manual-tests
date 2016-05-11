'use strict';

require('./b-test.less');
const template = require('./b-test.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTest', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTest',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
