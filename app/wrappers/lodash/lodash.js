'use strict';

const _ = require('lodash');

angular
  .module('mt.wrappers.lodash')

  /*@ngInject*/
  .factory('_', ($window) => _);
