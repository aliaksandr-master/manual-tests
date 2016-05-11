'use strict';

const appTestMdl = require('./app.test');

angular
  .module('mt.states.app.test.question', [
    appTestMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.test.question', {
      parent: 'app.test',
      url: '/question',

      resolve: {

      },

      views: {
        'test-body': {
          template: '<b-test-question></b-test-question>',
          controllerAs: 'appTestQuestionCtrl',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = 'mt.states.app.test.question';
