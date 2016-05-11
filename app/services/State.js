'use strict';

angular
  .module('mt.services')

  /*@ngInject*/
  .factory('State', (_, $state, $location, $rootScope, Utils) => {
    const State = {};

    State.reloadAll = () =>
      $state.reload();

    State.reloadCurrent = (params = {}, options = {}) =>
      $state.go($state.current, params, { reload: $state.current, ...options });

    State.setSearchParam = (paramName, value) => {
      $location.search(paramName, value);
    };

    State.onChangeStart = (handler) => {
      const cleanUp = $rootScope.$on('$stateChangeStart', handler);

      return _.once(cleanUp);
    };

    State.onChangeSuccess = (handler) => {
      const cleanUp = $rootScope.$on('$stateChangeSuccess', handler);

      return _.once(cleanUp);
    };

    State.onChangeError = (handler) => {
      const cleanUp = $rootScope.$on('$stateChangeError', handler);

      return _.once(cleanUp);
    };

    State.onChange = (handler) => {
      const cleanUpSuccess = State.onChangeSuccess(handler);
      const cleanUpError = State.onChangeSuccess(handler);

      return _.once(() => {
        cleanUpSuccess();
        cleanUpError();
      });
    };

    State.oneChange = (handler) => {
      const cleanUp = _.once(State.onChange(_.once((...args) => {
        cleanUp();
        handler(...args);
      })));

      return cleanUp;
    };

    State.onLocationChangeSuccess = (handler) => {
      const cleanUp = $rootScope.$on('$locationChangeSuccess', handler);

      return _.once(cleanUp);
    };

    let cleanUpLockChangeState = null;

    State.lock = () => {
      if (cleanUpLockChangeState) {
        return;
      }

      cleanUpLockChangeState = State.onChangeStart((ev) => {
        ev.preventDefault();
      });
    };

    State.unlock = () => {
      if (!cleanUpLockChangeState) {
        return;
      }

      cleanUpLockChangeState();
      cleanUpLockChangeState = null;
    };

    return State;
  })

  /*@ngInject*/
  .run(($log, State) => {
    State.onChangeError((event, toState, toParams, fromState, fromParams, error) => {
      $log.error('$stateChangeError:', error);
    });
  });
