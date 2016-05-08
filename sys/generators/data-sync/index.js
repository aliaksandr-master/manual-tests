/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'data/syncs',

  prepare: function () {
    var that = this;

    this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'data-sync name:',
        validate: this._validate(function (name) {
          that._validateName(name);
          that._validateCamelFormat(name);
          that._validateFirstLetterUpper(name);
          that._validateFileIsNew(that._cwd(), '**/' + name + 'Sync.js');

          if (/Sync$/.test(name)) {
            throw new Error('invalid format. must has no Sync part');
          }

          return true;
        }),
        filter: function (name) {
          return name + 'Sync';
        }
      }
    ], function (props) {
      that.name = props.name;
    });
  },

  commit: function () {
    this._copyTplFile('data-sync.js', this._cwdFile(this.name + '.js'), {
      name: this.name
    });

    this._addRelRequire(this._cwdFile('../index.js'), this._cwdFile(this.name + '.js'));
  }

});
