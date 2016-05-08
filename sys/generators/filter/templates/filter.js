'use strict';

angular
  .module('<%= __CONFIG__.filter.namespace %>')

  /*@ngInject*/
  .filter('<%= name %>', () => (value) => value);
