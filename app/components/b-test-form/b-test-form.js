'use strict';

require('./b-test-form.less');
const template = require('./b-test-form.html');

angular
  .module('mt.components')

  /*@ngInject*/
  .directive('bTestForm', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: 'bTestForm',

    scope: {
      allTags: '=',
      test: '='
    },

    /*@ngInject*/
    controller (TestStore, $state) {
      const vm = this;

      vm.remove = () => {
        TestStore.remove(vm.test);
        $state.go('app.tests', {}, { reload: true });
      };

      vm.save = () => {
        if (!vm.test._id) {
          TestStore.create(vm.test);
        } else {
          TestStore.update(vm.test);
        }

        $state.go('app.tests', {}, { reload: true });
      };
    }
  }));
