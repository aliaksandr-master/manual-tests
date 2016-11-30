'use strict';

import once from 'lodash/once';

export default (handlerArray = []) =>
  once((...args) => {
    handlerArray.forEach((handler) => handler(...args));
  });
