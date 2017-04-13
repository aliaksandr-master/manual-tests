'use strict';

export const getJSON = (url) => {
  if (window.getJSON) {
    return window.getJSON(url);
  }

  return window.fetch(url)
    .then((response) => response.json());
};

export const getFileContent = (url) => {
  if (window.getFileContent) {
    return window.getFileContent(url);
  }

  return window.fetch(url)
    .then((response) => response.text());
};

export const getTestData = () => {
  return getFileContent('/data/test.dat4')
    .then((content) =>
      content
        .split('\n').filter(Boolean)
        .map((line) => line.split(/\s+/).filter(Boolean).pop())
        .map((content) => new Buffer(content, 'base64').toString('utf8'))
        .map((content) => {
          try {
            content = JSON.parse(content);
          } catch (er) {
            content = null;
          }

          return content;
        })
        .filter(Boolean)
    )
    .then((content) => {
      const [ meta, ...questions ] = content;

      return {
        meta,
        questions
      }
    });
};
