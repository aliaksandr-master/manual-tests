'use strict';

import iterate from './iterate';

export const html = (element, htmlString) =>
  iterate(element, (element) => {
    element.innerHTML = htmlString;
  });

export const text = (element, string) =>
  iterate(element, (element) => {
    element.innerText = string;
  });


export const val = (element) => {
  let val = '';

  iterate(element, (element, i) => {
    if (i !== 0) {
      return false;
    }

    val = String(element.value || '');

    return true;
  });

  return val;
};
