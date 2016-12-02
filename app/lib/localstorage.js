'use strict';

export const setObject = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getObject = (name, defaultData = null) => {
  const data = localStorage.getItem(name);

  if (data != null) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return defaultData;
    }
  }

  return defaultData;
};
