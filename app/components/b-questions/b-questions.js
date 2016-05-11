'use strict';

require('./b-questions.less');
const template = require('./b-questions.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bQuestions', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bQuestions',

    scope: {
      questions: '='
    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
