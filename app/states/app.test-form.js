'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.test-form', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.test-form', {
      parent: 'app',
      url: '/test/:testId/form',
      params: {
        testId: 'new'
      },

      resolve: {
        /*@ngInject*/
        _test (TestStore, $stateParams) {
          if ($stateParams.testId === 'new') {
            return {
              name: '',
              count: 25,
              tags: []
            };
          }

          return TestStore.getById($stateParams.testId);
        }
      },

      views: {
        'app@app': {
          template: '<b-test-form data-test="appTestFormCtrl.test"></b-test-form>',
          controllerAs: 'appTestFormCtrl',

          /*@ngInject*/
          controller (_test) {
            const vm = this;

            vm.test = _test;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.test-form';
