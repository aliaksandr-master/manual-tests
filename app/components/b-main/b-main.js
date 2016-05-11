'use strict';

require('./b-main.less');
const template = require('./b-main.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bMain', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bMain',

    scope: {
      tests: '='
    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
