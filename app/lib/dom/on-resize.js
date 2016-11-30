'use strict';

import Stream from '../Stream';
import throttle from 'lodash/throttle';

const stream = Stream();

let resizeListener = null;

export default (callback) => {
  if (!resizeListener) {
    window.onresize = resizeListener = throttle((...args) => {
      stream.$emit(...args);
    }, 150);
  }

  return stream.$on(callback);
};
