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

      },

      views: {
        'app': {
          template:
            '<h1>HELLO!</h1>',
          controllerAs: 'appMainCtrl',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = 'mt.states.app.main';
