'use strict';

const appTestMdl = require('./app.test');

angular
  .module('mt.states.app.test.start', [
    appTestMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.test.start', {
      parent: 'app.test',
      url: '/start',

      resolve: {

      },

      views: {
        'test-body': {
          template: '<b-test-start></b-test-start>',
          controllerAs: 'appTestStartCtrl',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = 'mt.states.app.test.start';
