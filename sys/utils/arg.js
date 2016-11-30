'use strict';

const arg = exports;
const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));

arg.get = (name, def, availableValues) => {
  if (availableValues != null) {
    const val = arg.get(name, def);

    if (!_.includes(availableValues, val)) {
      throw new Error(`invalid ${name}, must be [${availableValues}], "${val}" given`);
    }
  }

  if (argv[name] == null) {
    return def;
  }

  return argv[name];
};

arg.flag = (name, def, availableValues) => Boolean(arg.get(name, def, availableValues));
