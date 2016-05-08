/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');
var path = require('path');

module.exports = BaseGenerator.extend({

  _CWD: 'components',

  prompts: function () {
    const filter = (name) => 'b-' + name.replace(/^b-/, '');

    this.answers = this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'component name:',
        validate: this._validate((name) => {
          this._validateName(name);
          this._validateDashFormat(name);

          name = filter(name);

          this._validateFileIsNew(this._cwd(), '**/' + name + '.html');

          return true;
        }),
        filter
      }
    ]);
  },

  commit: function () {
    const name = this.answers.name;

    this._copyTplFile('component.js', this._cwdFile(name + '/' + name + '.js'), this.answers);
    this._copyTplFile('component.html', this._cwdFile(name + '/' + name + '.html'), this.answers);
    this._copyTplFile('component.less', this._cwdFile(name + '/' + name + '.less'), this.answers);

    this._addRelRequire(this._cwdFile('index.js'), this._cwdFile(name + '/' + name + '.js'));
  }
});
