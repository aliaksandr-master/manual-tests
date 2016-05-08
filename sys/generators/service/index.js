/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'services',

  prepare: function () {
    this.answers = this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'service name:',
        validate: this._validate((name) => {
          this._validateName(name);
          this._validateCamelFormat(name);
          this._validateFirstLetterUpper(name);
          this._validateFileIsNew(this._cwd(), '**/' + name + '.js');

          return true;
        })
      }
    ]);
  },

  commit: function () {
    this._copyTplFile('service.js', this._cwdFile(this.name + '.js'), this.answers);

    this._addRelRequire(this._cwdFile('index.js'), this._cwdFile(this.name + '.js'));
  }

});
