'use strict';

const urijs = require('urijs');

angular
  .module('mt.wrappers.urijs')

  /*@ngInject*/
  .factory('URI', ($window) => urijs);
