/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const gutil = require('gulp-util');
const through = require('through2');

const handleCallback = (callback, value) => (err) => {
  if (err && !(err instanceof gutil.PluginError)) {
    err = new gutil.PluginError(err.plugin || 'gulp-eslint', err, {
      showStack: (err.showStack !== false)
    });
  }
  callback(err, value);
};

const tryResultAction = (action, result, done) => {
  try {
    if (action.length > 1) {
      // async action
      action(result, done);
    } else {
      // sync action
      action(result);
      done();
    }
  } catch (error) {
    done(!error ? new Error('Unknown Error') : error);
  }
};

module.exports = () => {
  let hasError = false;

  return through.obj((file, enc, done) => {
    if (file.lesshint && !file.lesshint.success) {
      hasError = true;
    }

    done(null, file);
  }, (done) => {
    tryResultAction(() => {
      if (hasError) {
        throw new gutil.PluginError('gulp-lesslint', { name: 'LessLintError', message: 'Failed with errors' });
      }
    }, 0, handleCallback(done));
  });
};
