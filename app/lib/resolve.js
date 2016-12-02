'use strict';


export default (obj) =>
  Promise.all(
    Object.keys(obj)
      .map((key) =>
        Promise.resolve(obj[key]())
          .then((result) => ({ key, result }))
      )
  )
    .then((results) =>
      results.reduce((resolves, { key, result }) => {
        resolves[key] = result;

        return resolves;
      }, {})
    );
