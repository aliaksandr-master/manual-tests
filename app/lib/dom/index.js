'use strict';

export const remove = (element) => {
  if (!element) {
    return;
  }
  element.parentNode.removeChild(element);
};




export const insertHTML = (element, html, method = 'beforeEnd') => {
  if (!element) {
    return;
  }

  element.insertAdjacentHTML(method, html);
};




export const children = (element) =>
  Array.prototype.slice.call(element.childNodes);

