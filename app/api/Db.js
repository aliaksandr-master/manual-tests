/*eslint-disable*/

'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require('./config');
var Utils = require('./Utils');

if (!fs.existsSync(config.CWD)) {
  fs.mkdirSync(config.CWD);
}

var Db = function (name, options) {
  var baseStructure = [];

  options = _.extend({
    deletable: false
  }, options);

  var db = _.cloneDeep(baseStructure);
  var dbFilePath = path.join(config.CWD, 'db-' + name + '.json');

  var saveDb = _.throttle(function () {
    fs.writeFileSync(dbFilePath, JSON.stringify(db,  null, '\t'), { encoding: 'utf8' });
  }, 300, { leading: false, trailing: true });

  var loadDb = function () {
    db = JSON.parse(fs.readFileSync(dbFilePath, { encoding: 'utf8' }));
  };

  var prepareItem = function (record) {
    return _.cloneDeep(record);
  };

  var getRecordByd = function (id) {
    return _.find(db, { _id: id });
  };

  var getByCriteria = function (criteria) {
    return _.filter(db, function (record) {
      if (_.isFunction(criteria)) {
        return criteria(record);
      }

      return _.every(criteria, function (v, k) {
        return record[k] === v;
      })
    }).map(prepareItem);
  };

  var getById = function (id) {
    var record = getRecordByd(id);

    if (!record) {
      return null;
    }

    return prepareItem(record);
  };

  var deleteById = function (id) {
    var record = getRecordByd(id);

    if (!record) {
      return;
    }

    if (options.deletable) {
      var index = _.indexOf(record);

      db.splice(index, 1);
    } else {
      record._deleted = true;
    }

    saveDb();
  };

  var parseRecord = function (record) {
    var meta = {};
    var data = {};

    _.each(record, function (v, k) {
      if (/^_/.test(k)) {
        meta[k] = v;
      } else {
        data[k] = v;
      }
    });

    return {
      meta: meta,
      data: data
    }
  };

  var isPrimitive = function (v) {
    return (_.isNumber(v) || _.isString(v) || _.isBoolean(v) || _.isNull(v) || _.isUndefined(v)) && !_.isNaN(v);
  };

  var setById = function (id, data) {
    var record;
    var mainRecord;

    if (id) {
      mainRecord = getRecordByd(id);
    }

    var date = String(new Date());
    var _data = parseRecord(data);
    var newRecord = false;

    if (mainRecord) {
      record = _.extend({}, mainRecord, _data.data);
      record._mdate = date;
    } else {
      newRecord = true;
      record = _.clone(_data.data);

      record = _.extend(record, {
        _id: id || Utils.uniqId(),
        _cdate: date,
        _mdate: date
      });
    }

    record = Utils.cleanUpPrivateProps(record);

    var allIsAllRight = _.every(record, function (v, k) {
      if (_.isArray(v)) {
        if (!v.length) {
          return true;
        }

        return _.every(v, isPrimitive);
      }

      return isPrimitive(v);
    });

    if (!allIsAllRight) {
      console.error('there are some nested structures in record', record);
      return null;
    }

    if (newRecord) {
      db.push(record);
    } else {
      _.extend(mainRecord, record);
    }

    saveDb();

    return prepareItem(record);
  };

  try {
    if (fs.existsSync(dbFilePath)) {
      loadDb();
    } else {
      db = _.cloneDeep(baseStructure);
      saveDb();
    }
  } catch (err) {
    db = _.cloneDeep(baseStructure);
    console.error(err);
  }

  return {
    getById: getById,
    getByCriteria: getByCriteria,
    setById: setById,
    deleteById: deleteById
  };
};


module.exports = Db;
