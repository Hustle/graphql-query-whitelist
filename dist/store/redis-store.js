'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisKey = 'queries';

var RedisStore = function () {
  function RedisStore() {
    (0, _classCallCheck3.default)(this, RedisStore);

    var Redis = require('ioredis');

    for (var _len = arguments.length, redisOptions = Array(_len), _key = 0; _key < _len; _key++) {
      redisOptions[_key] = arguments[_key];
    }

    this.redisClient = new (Function.prototype.bind.apply(Redis, [null].concat(redisOptions)))();
  }

  (0, _createClass3.default)(RedisStore, [{
    key: 'get',
    value: function get(key) {
      return this.redisClient.hget(redisKey, key).then(function (val) {
        return val === null ? undefined : JSON.parse(val);
      });
    }
  }, {
    key: 'set',
    value: function set(key, val) {
      return this.redisClient.hset(redisKey, key, (0, _stringify2.default)(val));
    }
  }, {
    key: 'entries',
    value: function entries() {
      return this.redisClient.hgetall(redisKey).then(function (queries) {
        return (0, _keys2.default)(queries).map(function (key) {
          return [key, JSON.parse(queries[key])];
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete(key) {
      return this.redisClient.hdel(redisKey, key);
    }
  }, {
    key: 'clear',
    value: function clear() {
      return this.redisClient.flushdb();
    }
  }]);
  return RedisStore;
}();

exports.default = RedisStore;