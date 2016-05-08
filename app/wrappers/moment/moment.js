'use strict';

const moment = require('moment');

angular
  .module('mt.wrappers.moment')

  /*@ngInject*/
  .factory('moment', ($window) => moment);
