'use strict';

export const map = (array, iterator) => {
  if (!array || !array.length) {
    return [];
  }

  const newArr = [];

  if (typeof iterator === 'string') {
    for (let i = 0; i < array.length; i++) {
      newArr[i] = iterator.replace(/\$\{\s*value\s*}/gi, array[i]).replace(/\$\{\s*index\s*}/gi, i);
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      newArr[i] = iterator(array[i], i);
    }
  }

  return newArr;
};

export const smap = (array, iterator, separator = '') =>
  map(array, iterator).join(separator);

