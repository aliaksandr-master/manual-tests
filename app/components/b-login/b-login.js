'use strict';

require('./b-login.less');
const template = require('./b-login.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bLogin', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bLogin',

    scope: {

    },

    /*@ngInject*/
    controller (MtUserStore, SessionStore) {
      const vm = this;

      vm.firstName = '';
      vm.lastName = '';
      vm.group = '';

      vm.submit = () => {
        SessionStore.login(vm.firstName, vm.lastName, vm.group);
      };
    }
  }));
