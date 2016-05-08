/*eslint disable: true */
'use strict';

var _ = require('lodash');
var path = require('path');
var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'components',

  prompts () {
    const filter = (name) => 'b-' + name.replace(/^b-/, '');

    this.answers = this._prompt([
      {
        type: 'list',
        name: 'oldName',
        message: 'component name for renaming:',
        choices: this._dirs(this._cwd() + '/*')
          .map((file) => path.basename(file))
      },
      {
        type: 'input',
        name: 'newName',
        filter,
        message: 'new name:',
        validate: (name) => {
          this._validateName(name);
          this._validateDashFormat(name);

          name = filter(name);

          this._validateFileIsNew(this._cwd(), '**/' + name + '.html');

          return true;
        }
      }
    ]);
  },

  commit () {
    const oldName = this.answers.oldName;
    const newName = this.answers.newName;

    [
      [ path.join(this._cwd(), oldName, oldName + '.js'), path.join(this._cwd(), newName, newName + '.js') ],
      [ path.join(this._cwd(), oldName, oldName + '.html'), path.join(this._cwd(), newName, newName + '.html') ],
      [ path.join(this._cwd(), oldName, oldName + '.less'), path.join(this._cwd(), newName, newName + '.less') ]
    ]
      .forEach(([ oldFilePath, newFilePath ]) => {
        this._processFile(oldFilePath, (content) => {
          content = content.replace(RegExp(oldName, 'g'), newName);
          content = content.replace(RegExp(_.camelCase(oldName), 'g'), _.camelCase(newName));

          return content;
        });

        this.fs.move(oldFilePath, newFilePath);
      });

    this._processFile(path.join(this._cwd(), 'index.js'), (content) => content.replace(oldName + '/' + oldName, newName + '/' + newName));
  }
});
