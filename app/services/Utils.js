'use strict';

angular
  .module('mt.services')

  /*@ngInject*/
  .factory('Utils', ($timeout, $window, $q, $log, _, moment) => {
    const Utils = {};

    Utils.Stream = () => {
      const stream = {};
      let subscribers = [];
      let onDestroyListeners = [];

      const $on = (callback) => {
        subscribers.push(callback);

        return _.once(() => {
          subscribers = _.without(subscribers, callback);
        });
      };

      const $emit = (...args) => {
        subscribers.forEach((callback) => {
          callback(...args);
        });
      };

      const $destroy = () => {
        onDestroyListeners.forEach((listenerOff) => {
          listenerOff();
        });
        subscribers = [];
        onDestroyListeners = [];
      };

      const $listen = (readableStream) => {
        const off = readableStream.$on((...args) => {
          $emit(...args);
        });

        onDestroyListeners.push(off);

        return _.once(() => {
          onDestroyListeners = _.without(onDestroyListeners, off);
          off();
        });
      };

      const $child = () => {
        const stream = Utils.Stream();
        const off = stream.$listen(stream);

        onDestroyListeners.push(off);

        return stream;
      };

      stream.$on = $on;
      stream.$emit = $emit;
      stream.$child = $child;
      stream.$listen = $listen;
      stream.$destroy = $destroy;

      return stream;
    };

    Utils.destroyable = (vm) => {
      const cleanups = [];
      let destroyWasHappened = false;

      if (vm.$onDestroy) {
        throw new Error('$onDestroy was declared before Utils.destroyable');
      }

      vm.$onDestroy = () => {
        destroyWasHappened = true;

        _.each(cleanups, (cleanup) => {
          cleanup();
        });
      };

      return (cleanup) => {
        if (destroyWasHappened) {
          cleanup();
          return;
        }
        cleanups.push(cleanup);
      };
    };

    Utils.deepFilter = (object, filterer) => {
      const isArray = _.isArray(object);

      return _.transform(object, (memo, value, key) => {
        if (!filterer(value, key)) {
          return;
        }

        if (value != null && (_.isArray(value) || _.isObject(value))) {
          value = Utils.deepFilter(value, filterer);
        } else {
          value = _.clone(value);
        }

        if (isArray) {
          memo.push(value);
        } else {
          memo[key] = value;
        }
      }, isArray ? [] : {});
    };

    Utils.nestedModelNull = (objOrId, getBuId) => {
      if (objOrId == null) {
        return $q.resolve(null);
      }

      if (_.isObject(objOrId)) {
        return $q.resolve(objOrId);
      }

      return getBuId(objOrId);
    };

    Utils.nestedModel = (objOrId, getBuId) => {
      if (_.isObject(objOrId)) {
        return $q.resolve(objOrId);
      }

      return getBuId(objOrId);
    };

    Utils.id = (objOrId, idAttribute = 'id') => {
      if (objOrId == null) {
        return undefined;
      }

      if (_.isObject(objOrId)) {
        return !objOrId.hasOwnProperty(idAttribute) || objOrId[idAttribute] == null ? undefined : objOrId[idAttribute];
      }

      return objOrId == null ? undefined : objOrId;
    };

    let uniqCounter = 0;
    const START_TIMESTAMP = Number(Date.now()).toString(36);

    Utils.uniqId = (name = 'u') => name + START_TIMESTAMP + Number(uniqCounter++).toString(36);

    return Utils;
  });
