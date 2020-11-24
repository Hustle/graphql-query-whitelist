#!/usr/bin/env node
'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _optimist = require('optimist');

var _optimist2 = _interopRequireDefault(_optimist);

var _ = require('./');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _optimist$usage$deman = _optimist2.default.usage('Stores the queries residing in the specified directories.\nUsage: gql-whitelist dir1 [dir2] [dir3] ').demand('endpoint').alias('H', 'header').describe('endpoint', 'Base URL of query whitelist API').describe('header', 'Header to send to the API: e.g key=value'),
    argv = _optimist$usage$deman.argv;

var directories = argv._,
    endpoint = argv.endpoint,
    header = argv.header;


var parseHeaders = function parseHeaders(headers) {
  headers = Array.isArray(headers) ? headers : [headers];

  return headers.reduce(function (result, header) {
    var _header$split = header.split(/=(.+)/),
        _header$split2 = (0, _slicedToArray3.default)(_header$split, 2),
        key = _header$split2[0],
        val = _header$split2[1];

    result[key] = val;
    return result;
  }, {});
};

var client = _axios2.default.create({
  baseURL: endpoint,
  timeout: 10000,
  maxRedirects: 0,
  headers: header && parseHeaders(header)
});

var addQueryToWhitelist = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var query = _ref2.query,
        filename = _ref2.filename;

    var _ref3, _ref3$data, operationName, id;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            console.log('Adding query from ' + filename);
            _context.next = 4;
            return client.post('/queries', { query: query });

          case 4:
            _ref3 = _context.sent;
            _ref3$data = _ref3.data;
            operationName = _ref3$data.operationName;
            id = _ref3$data.id;

            console.log(filename + ' => ' + operationName + ' => ' + id);
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);

            if (_context.t0.response) {
              console.error(_context.t0.response.data);
            } else {
              console.error(_context.t0);
            }
            throw _context.t0;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function addQueryToWhitelist(_x) {
    return _ref.apply(this, arguments);
  };
}();

var execute = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var store;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            store = void 0;
            _context3.prev = 1;
            _context3.next = 4;
            return _promise2.default.all(directories.map(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dir) {
                var queries;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return (0, _.getQueriesFromDir)(dir);

                      case 2:
                        queries = _context2.sent;
                        return _context2.abrupt('return', _promise2.default.all(queries.map(addQueryToWhitelist)));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 4:
            console.log('All queries stored successfully');
            _context3.next = 11;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](1);

            console.trace(_context3.t0);
            process.exitCode = 1;

          case 11:
            _context3.prev = 11;

            store && store.redisClient.quit();
            return _context3.finish(11);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 7, 11, 14]]);
  }));

  return function execute() {
    return _ref4.apply(this, arguments);
  };
}();

execute();