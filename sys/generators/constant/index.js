/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'configuration',

  prepare: function () {
    var that = this;

    var filter = function (value) {
      return value.replace(/(?:Constant)?$/, 'Constant');
    };

    this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'constant service name:',
        filter: filter,
        validate: this._validate(function (name) {
          name = filter(name);

          that._validateName(name);
          that._validateCamelFormat(name);
          that._validateFirstLetterUpper(name);
          that._validateFileIsNew(that._cwd(), '**/' + name + '.js');

          return true;
        })
      }
    ], function (props) {
      that.name = props.name;
    });
  },

  commit: function () {
    var filePath = this._cwdFile(this.name + '.js');

    this._copyTplFile('constant.js', filePath, { name: this.name });

    this._addRelRequire(this._cwdFile('index.js'), filePath);
  }
});
