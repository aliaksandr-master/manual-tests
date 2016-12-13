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

export const getFilesInDir = (url) => {
  if (window.getFilesInDir) {
    return window.getFilesInDir(url);
  }

  return window.fetch(url, { headers: { 'X-Dir-Files': 'glob' } })
    .then((response) => response.json());
};
