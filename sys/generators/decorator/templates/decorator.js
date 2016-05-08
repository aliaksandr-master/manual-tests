'use strict';

angular
  .module('<%= __CONFIG__.decorator.namespace %>')

  /*@ngInject*/
  .directive('<%= _.camelCase(name) %>', () => ({
    restrict: 'A',
    link ($scope, $element, $attrs) {

    }
  }));
