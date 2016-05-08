'use strict';

const configurationMdl = require('../configuration');
const vendorWrappersMdl = require('../wrappers');
const decortorsMdl = require('../decorators');
const filtersMdl = require('../filters');
const servidesMdl = require('../services');
const dataMdl = require('../data');

angular
  .module('mt.components', [
    vendorWrappersMdl,
    configurationMdl,
    decortorsMdl,
    filtersMdl,
    servidesMdl,
    dataMdl
  ]);


/*generator:require*/

module.exports = 'mt.components';
