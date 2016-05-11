'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.main', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.main', {
      parent: 'app',
      url: '/main',

      resolve: {
        /*@ngInject*/
        _tests (TestStore) {
          return TestStore.getActiveTests();
        }
      },

      views: {
        'app@app': {
          template: '<b-main data-tests="appMainCtrl.tests"></b-main>',
          controllerAs: 'appMainCtrl',

          /*@ngInject*/
          controller (_tests) {
            const vm = this;

            vm.tests = _tests;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.main';
