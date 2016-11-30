'use strict';

import once from 'lodash/once';
import { EVENT_DESTROY } from 'tiny-component';
import on from './dom/on';
import iterate from './dom/iterate';

export default (el, events) => {
  return {
    serialize (selector) {
      if (typeof selector === 'string') {
        selector = el.querySelectorAll(selector);
      }

      const result = {};

      iterate(selector, (element) => {
        if (!element.name) {
          throw new Error('has no name attribute for serializing');
        }
        result[element.name] = element.value;
      });

      return result;
    },
    on (selector, event, handler) {
      if (typeof selector === 'string') {
        selector = el.querySelectorAll(selector);
      }

      const cleanupEventOn = on(selector, event, handler);
      const cleanupEventDestroy = events.on(EVENT_DESTROY, cleanupEventOn);

      return once(() => {
        cleanupEventOn();
        cleanupEventDestroy();
      });
    }
  }
};
