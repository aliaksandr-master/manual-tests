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


require('./b-login/b-login');
require('./b-main/b-main');
require('./b-app/b-app');
require('./b-test/b-test');
require('./b-test-form/b-test-form');
require('./b-tests/b-tests');
require('./b-question/b-question');
require('./b-test-question/b-test-question');
require('./b-test-result/b-test-result');
require('./b-test-start/b-test-start');
require('./b-question-form/b-question-form');
require('./b-questions/b-questions');
/*generator:require*/

module.exports = 'mt.components';
