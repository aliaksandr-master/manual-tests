'use strict';

require('ng-tags-input');

angular
  .module('mt.wrappers.ng-tags-input', [
    'ngTagsInput'
  ]);

require('./ng-tags-input.less');

module.exports = 'mt.wrappers.ng-tags-input';
