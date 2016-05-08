/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'filters',

  prepare: function () {
    var that = this;

    this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'filter name:',
        validate: this._validate(function (name) {
          that._validateName(name);
          that._validateCamelFormat(name);
          that._validateFirstLetterLower(name);
          that._validateFileIsNew(that._cwd(), '**/' + name + '.js');

          return true;
        })
      }
    ], function (props) {
      that.name = props.name;
    });
  },

  commit: function () {
    var filePath = this.name + '/' + this.name + '.js';

    this._copyTplFile('filter.js', this._cwdFile(filePath), {
      name: this.name
    });

    this._addRelRequire(this._cwdFile('index.js'), this._cwdFile(filePath));
  }

});
