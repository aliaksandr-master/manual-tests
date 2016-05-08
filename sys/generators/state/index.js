/*eslint disable: true */
'use strict';

var path = require('path');
var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'states',

  prompts: function () {
    this.answers = this._prompt([
      {
        type: 'list',
        name: 'parentName',
        message: 'parent:',
        choices: this._files(this._cwd() + '/*.js').map((file) => path.relative(this._cwd(), file).replace(/\.js$/, ''))
      },
      {
        type: 'input',
        name: 'name',
        message: 'state name:',
        validate: this._validate((name, props) => {
          this._validateName(name);
          this._validateDashFormat(name);
          this._validateFileIsNew(this._cwd(), '**/' + props.parentName + '.' + name + '.js');

          return true;
        })
      }
    ]);
  },

  commit: function () {
    this._copyTplFile('state.js', this._cwdFile(this.answers.parentName + '.' + this.answers.name + '.js'), this.answers);
  }
});
