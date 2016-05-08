/* eslint-disable */
'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var glob = require('glob');
var chalk = require('chalk');
var fs = require('fs');
var config = require('../../package.json').generatorsConfig;

module.exports = generators.Base.extend({
  _CWD: '',

  prompts () {
    this.log(chalk.blue('\n========== SPLITMETRICS GENERATOR ==========\n'));

    this._prompt([
      {
        type: 'list',
        name: 'generator',
        message: 'what do you want to generate?:',
        choices: this._dirs(path.join(__dirname, '*'))
          .map(function (file) {
            return path.basename(file);
          })
      }
    ], (props) => {
      this.composeWith(path.resolve(__dirname, props.generator));
    });
  },

  _dirs (globTpl) {
    var onlyFiles = this._files(globTpl);

    return glob.sync(globTpl).filter(function (f) {
      return !_.includes(onlyFiles, f);
    });
  },

  _files (globTpl) {
    return glob.sync(globTpl, { nodir: true });
  },

  _validate (validator) {
    return function () {
      try {
        return validator.apply(this, arguments);
      } catch (e) {
        return e.message;
      }
    };
  },

  _validateDashFormat (name) {
    if (!/^[a-z][a-z0-9-]*?[^-]?$/.test(name)) {
      throw new Error('invalid format. must matched with expression regExp /^[a-z][a-z0-9-]*?[^-]?$/');
    }
  },

  _validateCamelFormat (name) {
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
      throw new Error('invalid format. must matched with expression regExp /^[a-zA-Z][a-zA-Z0-9]*$/');
    }
  },

  _validateFirstLetterUpper (name) {
    if (!/^[A-Z]/.test(name)) {
      throw new Error('invalid format. first letter must be in UpperCase');
    }
  },

  _validateFirstLetterLower (name) {
    if (!/^[a-z]/.test(name)) {
      throw new Error('invalid format. first letter must be in LowerCase');
    }
  },

  _validateName (name) {
    if (name != name.trim()) {
      throw new Error('invalid format. spaces is not allowed');
    }

    if (!name.length) {
      throw new Error('must be not empty');
    }
  },

  _validateFileIsNew (dir, template) {
    var that = this;
    var files = glob.sync(path.join(dir, template));

    if (files.length) {
      var prepare = function (file) {
        return chalk.red(path.relative(that._srcDir(), file));
      };

      throw new Error('files [' + _.map(files, prepare).join(', ') + '] already exists!');
    }
  },

  _srcDir () {
    return path.resolve(this.destinationRoot(), 'app');
  },

  _srcFile (file) {
    return path.resolve(this._srcDir(), file);
  },

  _cwd () {
    return path.resolve(this._srcDir(), this._CWD);
  },

  _cwdFile (file) {
    return path.resolve(this._cwd(), file);
  },

  _prompt (prompts, callback) {
    const done = this.async();
    const answers = {};

    this.prompt(prompts)
      .then((props) => {
        if (callback) {
          callback(props);
        } else {
          _.extend(answers, props);
        }
        done();
      });

    return answers;
  },

  _processFile (filePath, processMethod) {
    let content = fs.readFileSync(filePath, { encoding: 'utf-8' });

    content = processMethod(content);

    if (content === undefined) {
      return;
    }

    this.write(filePath, content);
  },

  _addRelRequire (absFilePathForPatch, requirePath, separator) {
    var content = fs.readFileSync(absFilePathForPatch, { encoding: 'utf-8' });

    var relPath = path.relative(path.dirname(absFilePathForPatch), requirePath);

    if (!/^\.\//.test(relPath)) {
      relPath = './' + relPath;
    }

    if (/\.js$/.test(relPath)) {
      relPath = relPath.replace(/\.js$/, '');
    }

    if (!separator) {
      separator = ';';
    }

    var requireStr = 'require(\'' + relPath + '\')' + separator;

    content = content.replace(/([\t ]*)(\/\*generator:require\*\/)/, '$1' + requireStr + '\n$1$2');

    this.write(absFilePathForPatch, content);
  },

  _copyTplFile (from, absPathTo, data) {
    this.fs.copyTpl(
      this.templatePath(from),
      absPathTo,
      _.extend({}, data, {
        __CONFIG__: config,
        _: _
      })
    );
  }
});
