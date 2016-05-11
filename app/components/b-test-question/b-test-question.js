'use strict';

require('./b-test-question.less');
const template = require('./b-test-question.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTestQuestion', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTestQuestion',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
