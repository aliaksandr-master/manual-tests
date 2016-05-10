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

      },

      template:
        `<div>
            <div ui-view="app"></div>
        </div>`,
      controllerAs: 'appCtrl',

      /*@ngInject*/
      controller () {
        // const vm = this;
      }
    });
  });

module.exports = 'mt.states.app';
