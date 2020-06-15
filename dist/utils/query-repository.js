'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryNotFoundError = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _parseQuery2 = require('./parse-query');

var _parseQuery3 = _interopRequireDefault(_parseQuery2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryNotFoundError = exports.QueryNotFoundError = function QueryNotFoundError(message) {
  (0, _classCallCheck3.default)(this, QueryNotFoundError);

  this.name = 'QueryNotFound';
  this.message = message || 'Query not found';
  this.stack = new Error().stack;
};

QueryNotFoundError.prototype = (0, _create2.default)(Error.prototype);

var QueryRepository = function () {
  function QueryRepository(store) {
    (0, _classCallCheck3.default)(this, QueryRepository);

    this.store = store;
  }

  (0, _createClass3.default)(QueryRepository, [{
    key: 'get',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryId) {
        var entry;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.store.get(queryId);

              case 2:
                entry = _context.sent;

                if (entry) {
                  _context.next = 5;
                  break;
                }

                throw new QueryNotFoundError();

              case 5:
                return _context.abrupt('return', (0, _extends3.default)({ id: queryId }, entry));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'put',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(query) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _parseQuery, queryId, operationName, normalizedQuery, queryObj;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _parseQuery = (0, _parseQuery3.default)(query, { requireOperationName: false }), queryId = _parseQuery.queryId, operationName = _parseQuery.operationName, normalizedQuery = _parseQuery.normalizedQuery;

                operationName = options.operationName || operationName || 'Unnamed query';
                queryObj = { query: normalizedQuery, operationName: operationName, enabled: true };
                _context2.next = 5;
                return this.store.set(queryId, queryObj);

              case 5:
                return _context2.abrupt('return', (0, _extends3.default)({ id: queryId }, queryObj));

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function put(_x2) {
        return _ref2.apply(this, arguments);
      }

      return put;
    }()

    // NOTE: if our build environment exports graphql operation ASTs,
    // then we don't want to use the put() interface above

  }, {
    key: 'putAST',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryAST) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _parseASTQuery, queryId, operationName, normalizedQuery, queryObj;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _parseASTQuery = (0, _parseQuery2.parseASTQuery)(queryAST, { requireOperationName: false }), queryId = _parseASTQuery.queryId, operationName = _parseASTQuery.operationName, normalizedQuery = _parseASTQuery.normalizedQuery;
                queryObj = { query: normalizedQuery, operationName: operationName, enabled: true };
                _context3.next = 4;
                return this.store.set(queryId, queryObj);

              case 4:
                return _context3.abrupt('return', (0, _extends3.default)({ id: queryId }, queryObj));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function putAST(_x4) {
        return _ref3.apply(this, arguments);
      }

      return putAST;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryId) {
        var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var query;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.get(queryId);

              case 2:
                query = _context4.sent;


                // don't allow to update the query
                delete properties.query;

                query = (0, _extends3.default)({}, query, properties);
                _context4.next = 7;
                return this.store.set(queryId, query);

              case 7:
                return _context4.abrupt('return', (0, _extends3.default)({ id: queryId }, query));

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x6) {
        return _ref4.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'entries',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var entries;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.store.entries();

              case 2:
                entries = _context5.sent;
                return _context5.abrupt('return', entries.map(function (_ref6) {
                  var _ref7 = (0, _slicedToArray3.default)(_ref6, 2),
                      queryId = _ref7[0],
                      properties = _ref7[1];

                  return (0, _extends3.default)({}, properties, { id: queryId });
                }).reverse());

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function entries() {
        return _ref5.apply(this, arguments);
      }

      return entries;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(queryId) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.get(queryId);

              case 2:
                return _context6.abrupt('return', this.store.delete(queryId));

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _delete(_x8) {
        return _ref8.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return QueryRepository;
}();

exports.default = QueryRepository;