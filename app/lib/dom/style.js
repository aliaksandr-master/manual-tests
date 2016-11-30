'use strict';

const bodyStyle = document.body.style;
const VENDOR_PREFIXES = [ 'moz', 'webkit', 'o', 'ms' ];
const propCache = {};

const getProp = (propSrc) => {
  if (propCache.hasOwnProperty(propSrc)) {
    return propCache[propSrc];
  }

  let prop = propSrc;

  if (!(prop in bodyStyle)) {
    let _prop;

    for (let i = 0; i < VENDOR_PREFIXES.length; i++) {
      _prop = VENDOR_PREFIXES[i] + prop.charAt(0).toUpperCase() + prop.slice(1);
      if (_prop in bodyStyle) {
        prop = _prop;
        break;
      }
    }
  }

  propCache[propSrc] = prop;

  return prop;
};

export const setStyle = (el, prop, value) => {
  el.style[getProp(prop)] = value;
};
