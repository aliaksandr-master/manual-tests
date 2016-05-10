'use strict';

const through = require('through2');

const defaultRead = (file) => file.contents.toString('utf8');

const defaultWrite = (file, content) => {
  file.contents = new Buffer(content, 'utf8');
};

module.exports = (options = {}) => {
  if (!options) {
    options = {};
  }

  options.run = options.run || null;
  options.read = options.read || defaultRead;
  options.write = options.write || defaultWrite;
  options.process = options.process || null;

  return through.obj((file, encoding, callback) => {
    if (!file.isBuffer()) {
      callback(null, file);
      return;
    }

    let promisePipe = Promise.resolve();

    if (options.process) {
      promisePipe = promisePipe
        .then(() => options.read(file))
        .then((content) => options.process(content))
        .then((content) => options.write(file, content));
    }

    if (options.run) {
      promisePipe = promisePipe
        .then(() => options.run(file));
    }

    promisePipe
      .then(() => callback(null, file))
      .catch((err) => callback(err, file));
  });
};
