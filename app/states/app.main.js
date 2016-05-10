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
        _test: ($window) => $window.nw.allData()
      },

      views: {
        'app': {
          template:
            '<h1>HELLO! {{ appMainCtrl.data }}</h1>',
          controllerAs: 'appMainCtrl',

          /*@ngInject*/
          controller (_test) {
            const vm = this;

            vm.data = _test;
          }
        }
      }
    });
  });

module.exports = 'mt.states.app.main';
