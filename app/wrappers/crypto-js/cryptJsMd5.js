'use strict';

const md5 = require('crypto-js/md5');

angular
  .module('mt.wrappers.crypto-js')

  /*@ngInject*/
  .factory('cryptJsMd5', () => (...args) => md5(...args));
