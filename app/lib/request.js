'use strict';

export const getJSON = (url) => {
  if (window.getJSON) {
    return window.getJSON(url);
  }

  return window.fetch('/data/questions.json')
    .then((response) => response.json());
};
