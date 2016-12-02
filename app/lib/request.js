'use strict';

export const getJSON = (url) =>
  window.fetch('/data/questions.json')
    .then((response) => response.json());


export const resolve = (obj) =>
  Promise.all(
    Object.keys(obj).map((key) => obj[key]().then((result) => ({ key, result })))
  )
    .then((results) =>
      results.reduce((resolves, { key, result }) => {
        resolves[key] = result;

        return resolves;
      }, {})
    );
