'use strict';

const <%= _.camelCase(parentName) %>Mdl = require('./<%= parentName %>');

angular
  .module('<%= __CONFIG__.state.namespace %>.<%= parentName %>.<%= name %>', [
    <%= _.camelCase(parentName) %>Mdl
  ])

  /*@ngInject*/
  .config(($stateProvider) => {
    $stateProvider.state('<%= parentName %>.<%= name %>', {
      parent: '<%= parentName %>',
      url: '/<%= name %>',

      resolve: {

      },

      views: {
        '': {
          template:
            '',
          controllerAs: '<%= _.camelCase(parentName + "-" + name + "-ctrl") %>',

          /*@ngInject*/
          controller () {
            // const vm = this;

          }
        }
      }
    });
  });

module.exports = '<%= __CONFIG__.state.namespace %>.<%= parentName %>.<%= name %>';
