'use strict';

angular
  .module('mt.data')

  /*@ngInject*/
  .factory('SessionStore', ($window, $state) => {
    const SessionStore = {};

    let sessionUser = null;

    SessionStore.get = () => sessionUser;

    SessionStore.login = (firstName, lastName, group) => {
      sessionUser = $window.mtApi.login(firstName, lastName, group);

      if (sessionUser) {
        if (sessionUser.isAdmin) {
          $state.go('app.tests', {}, { reload: true });
        } else {
          $state.go('app.main', {}, { reload: true });
        }
      }

      return sessionUser;
    };

    SessionStore.logout = () => {
      sessionUser = null;
      $state.go('app.main', {}, { reload: true });
    };

    return SessionStore;
  });
