'use strict';

const appTestMdl = require('./app.test');

angular
  .module('mt.states.app.test.result', [
    appTestMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.test.result', {
      parent: 'app.test',
      url: '/result',

      resolve: {

      },

      views: {
        'test-body': {
          template: '<b-test-result></b-test-result>',
          controllerAs: 'appTestResultCtrl',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = 'mt.states.app.test.result';
