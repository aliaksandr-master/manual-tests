/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'data/stores',

  prepare: function () {
    var that = this;

    var filter = function (value) {
      return value.replace(/(?:Store)?$/, 'Store');
    };

    this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'data-store name:',
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
    this._copyTplFile('data-store.js', this._cwdFile(this.name + '.js'), {
      name: this.name
    });

    this._addRelRequire(this._cwdFile('../index.js'), this._cwdFile(this.name + '.js'));
  }

});
