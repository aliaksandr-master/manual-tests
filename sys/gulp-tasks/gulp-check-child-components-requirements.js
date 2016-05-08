/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const through = require('through2');
const _ = require('lodash');
const gutil = require('gulp-util');
const gutils = require('../gulp-utils');
const path = require('path');
const fs = require('fs');

const getChildComponentsInHtml = (content) => {
  const childComponents = [];

  content.replace(/<\/(b-[^\s>]+)\s*>/g, ($0, $1) => {
    childComponents.push($1);
  });

  return _.uniq(childComponents);
};

const getChildComponentsInRequire = (content) => {
  const requiredComponents = [];

  content.replace(/require\('([^']+)'\);/g, ($0, $1) => {
    let cmp = $1.replace(/^.*?\/(b-[^\.\/]+)$/, '$1');

    if (cmp === $1) {
      return;
    }

    cmp = cmp.replace(/--/g, '-');

    requiredComponents.push(cmp);
  });

  return _.uniq(requiredComponents);
};

module.exports = (options) => {
  options = _.merge({
    cwd: process.cwd()
  }, options);

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    const templateFile = file.path;
    const templateFileContent = file.contents.toString('utf8');
    const componentName = path.basename(templateFile, path.extname(templateFile));

    const stateFile = path.join(path.dirname(templateFile), 'index.js');
    const directiveFile = path.join(path.dirname(templateFile), componentName + '.js');

    let controllerFile;

    if (fs.existsSync(stateFile)) {
      controllerFile = stateFile;
    } else if (fs.existsSync(directiveFile)) {
      controllerFile = directiveFile;
    } else {
      callback(gutils.error(file, 'there are no controller files'));
      return;
    }

    const controllerContent = fs.readFileSync(controllerFile, { encoding: 'utf-8' });
    const alreadyRequiredComponents = getChildComponentsInRequire(controllerContent);
    const needToRequireComponents = _.uniq(getChildComponentsInHtml(templateFileContent).concat(getChildComponentsInHtml(controllerContent)));

    const componentsThatNeedToRemoveFromController = _.difference(alreadyRequiredComponents, needToRequireComponents);
    const componentsThatNeedToAddToController = _.difference(needToRequireComponents, alreadyRequiredComponents);

    if (!componentsThatNeedToRemoveFromController.length && !componentsThatNeedToAddToController.length) {
      callback(null, file);
      return;
    }

    const messages = [];

    if (componentsThatNeedToAddToController.length) {
      messages.push(gutils.error(file, 'must add requirements of components [' + componentsThatNeedToAddToController.join(', ') + ']'));
    }

    if (componentsThatNeedToRemoveFromController.length) {
      messages.push(gutils.error(file, 'must remove requirements of components [' + componentsThatNeedToRemoveFromController.join(', ') + ']'));
    }

    callback(new gutil.PluginError('gulp-check-requirements', { name: 'GulpCheckRequirementsLintError', message: 'Failed with errors:\n' + messages.join('\n') + '\n' }), file);
  });
};
