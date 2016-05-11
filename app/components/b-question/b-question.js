'use strict';

require('./b-question.less');
const template = require('./b-question.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bQuestion', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bQuestion',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
