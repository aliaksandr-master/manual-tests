/*eslint-disable prefer-template*/
/*eslint-disable no-console*/
'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const root = path.resolve(__dirname, '../../app');
const files = glob.sync(path.resolve(root, 'components/**/*.js'));

files.forEach((file) => {
  let content = fs.readFileSync(file, { encoding: 'utf8' });
  const USE_STRICT_EXP = /^'use strict';/;
  const filename = path.basename(file, '.js');
  const dirPath = path.dirname(file);
  const dirname = path.basename(dirPath);

  if (!USE_STRICT_EXP.test(content)) {
    throw new Error(chalk.red('!!!!undefined useStrict'));
  }

  if (/^'use strict';\s+require\(/.test(content)) {
    return;
  }

  if (!/^(?:b-.+|index)$/.test(filename)) {
    return;
  }

  let base = filename;

  if (filename === 'index') {
    base = 'b-' + dirname.replace('.', '-');
  }

  const lessFile = base + '.less';
  const htmlFile = base + '.html';
  let addedHtml = false;
  let addedLess = false;

  content = content.replace(USE_STRICT_EXP, ($0) => {
    const prev = $0;

    $0 = $0 + '\n';

    if (fs.existsSync(dirPath + '/' + lessFile)) {
      $0 = $0 + '\nrequire(\'./' + lessFile + '\');\n';
      addedLess = true;
    } else {
      console.log('!!!!has-require>>', lessFile);
    }

    if (fs.existsSync(dirPath + '/' + htmlFile)) {
      $0 = $0 + '\nvar template = require(\'./' + htmlFile + '\');\n';
      addedHtml = true;
    } else {
      console.log('!!!!no-template>>', htmlFile);
    }

    $0 = $0 + '\n';

    return addedHtml || addedLess ? $0 : prev;
  });

  if (addedHtml) {
    content = content.replace(/templateUrl: '(?:[^']+)'(,)?/, 'template: template$1');
  }

  if (/templateUrl:/.test(content)) {
    console.log('@@@@', 'ERROR', 'exists "templateUrl:" IN', dirname + '/' + filename, addedHtml);
    return;
  }

  fs.writeFileSync(file, content, { encoding: 'utf8' });

  console.log('>>>', dirname, '/', filename, lessFile, htmlFile, addedHtml, addedLess);
});
