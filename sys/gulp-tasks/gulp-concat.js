/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const fs = require('fs');
const path = require('path');
const through = require('through2');
const _ = require('lodash');

module.exports = (options) => {
  options = _.extend({
    addFileComments: true
  }, options);

  return through.obj((file, encoding, callback) => {
    const srcDir = path.dirname(file.path);
    const filesArrayForConcat = JSON.parse(file.contents.toString('utf8'));

    const filesContentsForConcat = filesArrayForConcat.map((fileForConcat) => {
      const filePath = path.resolve(srcDir, fileForConcat);
      let content = fs.readFileSync(filePath, { encoding: 'utf-8' });

      if (options.addFileComments) {
        content = '\n\n//CONCAT FILE: ' + filePath + '\n' + content;
      }

      return content;
    });

    file.contents = new Buffer(filesContentsForConcat.join('\n'), 'utf8');

    callback(null, file);
  });
};

module.exports.replaceScripts = (srcFileContent, srcFilePath) =>
  srcFileContent.replace(/^([ ]*)<script[^>]+?data-concat="([^"]+)"[^>]*?><\/script>/gm, ($0, whitespace, concatFilePath) => {
    const concatFile = path.resolve(path.dirname(srcFilePath), concatFilePath);
    const scripts = JSON.parse(fs.readFileSync(concatFile, { encoding: 'utf8' }))
      .map((filePath) => whitespace + '<script src="' + filePath + '"></script>').join('\n');

    return '<!-- EXPAND CONCATENATED FILE: ' + concatFilePath + ' -->\n' + scripts +  '\n<!-- END EXPANDING -->\n';
  });
