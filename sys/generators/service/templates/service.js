'use strict';

angular
  .module('<%= __CONFIG__.service.namespace %>')

  /*@ngInject*/
  .factory('<%= name %>', () => {
    const <%= name %> = {};

    return <%= name %>;
  });
