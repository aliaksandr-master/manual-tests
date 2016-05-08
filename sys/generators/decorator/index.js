/*eslint disable: true */
'use strict';

var BaseGenerator = require('../index');

module.exports = BaseGenerator.extend({

  _CWD: 'decorators',

  prepare: function () {
    var that = this;

    this._prompt([
      {
        type: 'input',
        name: 'name',
        message: 'decorator name:',
        validate: this._validate(function (name) {
          that._validateName(name);
          that._validateDashFormat(name);
          that._validateFileIsNew(that._cwd(), '**/' + name + '.js');

          return true;
        })
      }
    ], function (props) {
      that.name = props.name;
    });
  },

  commit: function () {
    this._copyTplFile('decorator.js', this._cwdFile(this.name + '/' + this.name + '.js'), {
      name: this.name
    });

    this._addRelRequire(this._cwdFile('index.js'), this._cwdFile(this.name + '/' + this.name + '.js'));
  }

});
