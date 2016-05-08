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
        `<b-app
          data-user="appCtrl.user"
          data-user-team-owner="appCtrl.userTeamOwner"
          data-user-team-other="appCtrl.userTeamOther"
          data-user-team-invites="appCtrl.userTeamInvites"
        ></b-app>`,
      controllerAs: 'appCtrl',

      /*@ngInject*/
      controller () {
        // const vm = this;
      }
    });
  });

module.exports = 'mt.states.app';
