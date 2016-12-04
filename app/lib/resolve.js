'use strict';

const resolve = (obj, ...params) =>
  Promise.all(
    Object.keys(obj)
      .map((key) =>
        Promise.resolve(obj[key](...params))
          .then((result) => ({ key, result }))
      )
  )
    .then((results) =>
      results.reduce((resolves, { key, result }) => {
        resolves[key] = result;

        return resolves;
      }, {})
    );


resolve.nested = (obj) => (results) =>
  resolve(obj, { ...results })
    .then((resolveResults) => ({ ...results, ...resolveResults }));

export default resolve;
