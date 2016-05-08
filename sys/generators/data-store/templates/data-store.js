'use strict';

angular
  .module('<%= __CONFIG__.dataStore.namespace %>')

  /*@ngInject*/
  .factory('<%= name %>', () => {
    const <%= name %> = {};

    return <%= name %>;
  });
