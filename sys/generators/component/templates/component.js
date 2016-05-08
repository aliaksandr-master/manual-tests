'use strict';

require('./<%= name %>.less');
const template = require('./<%= name %>.html');

angular
  .module('<%= __CONFIG__.component.namespace %>')

  /*@ngInject*/
  .directive('<%= _.camelCase(name) %>', () => ({
    template,
    restrict: 'E',
    replace: true,
    bindToController: true,
    controllerAs: '<%= _.camelCase(name) %>',

    scope: {

    },

    /*@ngInject*/
    controller () {
      //const vm = this;
    }
  }));
