'use strict';

let uniqIdCounter = 0;

export default (name) => {
  if (!name) {
    throw new Error('symbol name is undefined');
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    throw new Error('symbol name has invalid format');
  }

  return `u${(uniqIdCounter++).toString(36)}-${name}`;
};
