'use strict';

require('./b-app.less');
const template = require('./b-app.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bApp', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bApp',

    scope: {
      user: '='
    },

    /*@ngInject*/
    controller (SessionStore) {
      const vm = this;

      vm.logout = () => {
        SessionStore.logout();
      };
    }
  }));
