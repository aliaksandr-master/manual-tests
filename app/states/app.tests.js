'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.tests', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.tests', {
      parent: 'app',
      url: '/tests',

      resolve: {
        /*@ngInject*/
        _tests (TestStore) {
          return TestStore.getActiveTests();
        }
      },

      views: {
        'app@app': {
          template: '<b-tests data-tests="appTestsCtrl.tests"></b-tests>',
          controllerAs: 'appTestsCtrl',

          /*@ngInject*/
          controller (_tests) {
            const vm = this;

            vm.tests = _tests;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.tests';
