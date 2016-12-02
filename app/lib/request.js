'use strict';

export const getJSON = (url) =>
  window.fetch('/data/questions.json')
    .then((response) => response.json());

