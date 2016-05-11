'use strict';

const appMdl = require('./app');

angular
  .module('mt.states.app.test', [
    appMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('app.test', {
      parent: 'app',
      url: '/test',

      resolve: {

      },

      views: {
        'app@app': {
          template: '<b-test></b-test>',
          controllerAs: 'appTestCtrl',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = 'mt.states.app.test';
