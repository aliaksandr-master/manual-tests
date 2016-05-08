/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const through = require('through2');
const _ = require('lodash');
const gutils = require('../gulp-utils');
const chalk = require('chalk');

const getExpArg = (exp, content) => {
  let arg = null;

  content.replace(exp, ($0, $1) => {
    arg = $1;
  });

  return arg;
};

module.exports = (options) => {
  options = _.merge({

  }, options);

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    const jsFileContent = file.contents.toString('utf8');

    const directiveName = getExpArg(/\.directive\('([^']+)', /, jsFileContent);

    if (!directiveName) {
      callback(null, file);
      return;
    }

    const isComponent = /\n[ ]+restrict: 'E',/.test(jsFileContent);

    if (!isComponent) { // decorator
      callback(null, file);
      return;
    }

    const controllerAsName = getExpArg(/\n[ ]+controllerAs: '([^']+)',/, jsFileContent);
    const controllerArgs = getExpArg(/controller \(([^\)]*)\) \{/, jsFileContent);
    const hasBindToController = /\n[ ]+bindToController: /.test(jsFileContent);
    const hasIsolatedScope = /\n[ ]+scope: \{/.test(jsFileContent);
    const has$scopeInController = /\$scope/.test(controllerArgs);
    const hasControllerAsTODO = /\/\/ TODO: need to add controllerAs syntax/.test(jsFileContent);
    const hasIsolatedScopeTODO = /\/\/ TODO: need to add isolated scope/.test(jsFileContent);
    const has$scopeTODO = /\/\/ TODO: need to remove \$scope/.test(jsFileContent);

    if (has$scopeInController && !has$scopeTODO) {
      callback(gutils.error(file, 'TODO for $scope ' + chalk.yellow('"// TODO: need to remove $scope"') + ' must be specified'), file);
      return;
    }

    if (!has$scopeInController && has$scopeTODO) {
      callback(gutils.error(file, 'TODO for $scope is unnecessary'), file);
      return;
    }

    if (!hasIsolatedScope && !hasIsolatedScopeTODO) {
      callback(gutils.error(file, 'TODO for isolated scope ' + chalk.yellow('"// TODO: need to add isolated scope"') + ' must be specified'), file);
      return;
    }

    if (hasIsolatedScope && hasIsolatedScopeTODO) {
      callback(gutils.error(file, 'TODO for isolated scope is unnecessary'), file);
      return;
    }

    if (!hasBindToController && !controllerAsName) {
      if (!hasControllerAsTODO) {
        callback(gutils.error(file, 'TODO for controllerAs ' + chalk.yellow('"// TODO: need to add controllerAs syntax"') + ' must be specified'), file);
        return;
      }

      callback(null, file);
      return;
    }

    if (!hasBindToController) {
      callback(gutils.error(file, 'bindToController must be specified'), file);
      return;
    }

    if (!controllerAsName) {
      callback(gutils.error(file, 'controllerAs is empty'), file);
      return;
    }

    if (controllerAsName !== directiveName) {
      callback(gutils.error(file, 'controllerAs "' + controllerAsName + '" is not equal to "' + directiveName + '"'), file);
      return;
    }

    if (hasControllerAsTODO) {
      callback(gutils.error(file, 'controllerAs "' + controllerAsName + '" TODO is unnecessary'), file);
      return;
    }

    callback(null, file);
  });
};
