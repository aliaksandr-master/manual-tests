'use strict';

const vendorWrappersMdl = require('../wrappers');
const configurationMdl = require('../configuration');
const servisesMdl = require('../services');
const dataMdl = require('../data');
const comoponentsMdl = require('../components');

angular
  .module('mt.states', [
    configurationMdl,
    vendorWrappersMdl,
    servisesMdl,
    dataMdl,
    comoponentsMdl
  ]);

module.exports = 'mt.states';
