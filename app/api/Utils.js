/*eslint-disable*/

'use strict';

var Utils = exports;
var _ = require('lodash');

var _counter = 0;
var base = Number(Date.now()).toString(36);

Utils.uniqId = function () {
  return 'u-' + String(base) + '-' + String((_counter++).toString(36));
};

Utils.deepFilter = function (object, filterer) {
  const isArray = _.isArray(object);

  return _.transform(object, function (memo, value, key) {
    if (!filterer(value, key)) {
      return;
    }

    if (value != null && (_.isArray(value) || _.isObject(value))) {
      value = Utils.deepFilter(value, filterer);
    } else {
      value = _.clone(value);
    }

    if (isArray) {
      memo.push(value);
    } else {
      memo[key] = value;
    }
  }, isArray ? [] : {});
};

Utils.cleanUpPrivateProps = function (data) {
  return Utils.deepFilter(data, function (value, key) {
    return !/^[$]/.test(String(key));
  });
};
