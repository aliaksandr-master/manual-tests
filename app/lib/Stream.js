'use strict';

import once from 'lodash/once';

export default () => {
  let subscribers = [];

  const $on = (callback) => {
    subscribers.push(callback);

    return once(() => {
      for (let i = 0; i < subscribers.length; i++) {
        if (subscribers[i] === callback) {
          subscribers.splice(i, 1);
          break;
        }
      }

      callback = null;
    });
  };

  const $emit = (...args) => {
    for (let i = 0; i < subscribers.length; i++) {
      subscribers[i](...args);
    }
  };

  const $destroy = () => {
    subscribers = [];
  };

  return { $on, $emit, $destroy };
};
