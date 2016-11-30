'use strict';

import once from 'lodash/once';
import iterate from './iterate';

const off = (domElements, eventName, handler) => // http://youmightnotneedjquery.com/
  iterate(domElements, (domElement) => {
    if (domElement.removeEventListener) {
      domElement.removeEventListener(eventName, handler);
      return;
    }

    domElement.detachEvent(`on${eventName}`, handler);
  });


const on = (domElements, eventName, handler) => // http://youmightnotneedjquery.com/
  iterate(domElements, (domElement) => {
    if (domElement.addEventListener) {
      domElement.addEventListener(eventName, handler);
      return;
    }

    domElement.attachEvent(`on${eventName}`, handler);
  });


export default (domElement, eventName, callback) => {
  if (!domElement || !eventName || !callback) {
    return () => {};
  }

  on(domElement, eventName, callback);

  return once(() => {
    off(domElement, eventName, callback);
  });
};
