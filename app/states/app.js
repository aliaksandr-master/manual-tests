'use strict';

const statesMdl = require('./index');

angular
  .module('mt.states.app', [
    statesMdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {

    $stateProvider.state('app', {
      url: '',
      abstract: true,

      resolve: {
        /*@ngInject*/
        _user (SessionStore) {
          return SessionStore.get();
        }
      },

      template: '<b-app data-user="appCtrl.user"></b-app>',
      controllerAs: 'appCtrl',

      /*@ngInject*/
      controller (_user) {
        const vm = this;

        vm.user = _user;
      }
    });
  });

module.exports = 'mt.states.app';
