/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const root = path.resolve(__dirname, '../../app');
const files = glob.sync(root + '/**/*.js');
let processed = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, { encoding: 'utf8' });
  const _content = content;

  content = content.replace(/^const ([^ ]+) = require\('([^']+)'\);/mg, ($0, $1, $2) => 'import ' + $1 + ' from \'' + $2 + '\';');

  content = content.replace(/^require\('([^']+)'\);/mg, ($0, $1) => 'import \'' + $1 + '\';');

  content = content.replace(/^module\.exports = /gm, 'export default ');

  if (_content !== content) {
    processed++;
    fs.writeFileSync(file, content, { encoding: 'utf8' });
  }
});

console.log('processed files ', chalk.green(processed + '/' + files.length));
