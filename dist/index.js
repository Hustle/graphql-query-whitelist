'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryRepository = exports.RedisStore = exports.MemoryStore = exports.Api = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _store = require('./store');

Object.defineProperty(exports, 'MemoryStore', {
  enumerable: true,
  get: function get() {
    return _store.MemoryStore;
  }
});
Object.defineProperty(exports, 'RedisStore', {
  enumerable: true,
  get: function get() {
    return _store.RedisStore;
  }
});

var _utils = require('./utils');

var _graphql = require('graphql');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

exports.default = function (_ref) {
  var store = _ref.store,
      _ref$skipValidationFn = _ref.skipValidationFn,
      skipValidationFn = _ref$skipValidationFn === undefined ? noop : _ref$skipValidationFn,
      _ref$validationErrorF = _ref.validationErrorFn,
      validationErrorFn = _ref$validationErrorF === undefined ? noop : _ref$validationErrorF,
      _ref$storeIntrospecti = _ref.storeIntrospectionQueries,
      storeIntrospectionQueries = _ref$storeIntrospecti === undefined ? false : _ref$storeIntrospecti,
      _ref$dryRun = _ref.dryRun,
      dryRun = _ref$dryRun === undefined ? false : _ref$dryRun;

  var repository = new _utils.QueryRepository(store);
  var storeIQPromise = storeIntrospectionQueries ? (0, _utils.storeIntrospectionQueries)(repository) : _promise2.default.resolve();

  if (dryRun) {
    console.info('[graphql-query-whitelist] - running in dry run mode');
  }

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var body, unauthorized, queryId, queryObj, _ref3, query, enabled;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              body = req.body;

              if (!((typeof body === 'undefined' ? 'undefined' : (0, _typeof3.default)(body)) !== 'object')) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', next(new Error('body-parser middleware (https://github.com/expressjs/body-parser) must be ' + 'inserted before graphql-query-whitelist middleware')));

            case 3:
              if (!(req.method === 'GET' && !req.query.queryId && !req.query.query)) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', next());

            case 5:
              unauthorized = function unauthorized(errorCode) {
                var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { message: 'Unauthorized query' };
                var statusCode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 403;

                validationErrorFn(req, { errorCode: errorCode });

                if (dryRun) {
                  next();
                } else {
                  res.status(statusCode).json({ errors: [(0, _graphql.formatError)(error)] });
                }
              };

              if (!skipValidationFn(req)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', next());

            case 8:
              _context.prev = 8;
              queryId = body.queryId || req.query.queryId;
              queryObj = {};
              _context.next = 13;
              return storeIQPromise;

            case 13:

              if (queryId) {
                queryObj = { queryId: queryId };
              } else if (body.query) {
                queryObj = (0, _utils.parseQuery)(body.query, { requireOperationName: false });
              } else {
                // No queryId or query was specified. Let express-graphql handle this
                next();
              }

              req.queryId = queryObj.queryId;
              req.operationName = queryObj.operationName;

              _context.next = 18;
              return repository.get(queryObj.queryId);

            case 18:
              _ref3 = _context.sent;
              query = _ref3.query;
              enabled = _ref3.enabled;

              body.query = query;

              enabled ? next() : unauthorized('QUERY_DISABLED');
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context['catch'](8);

              if (_context.t0 instanceof _utils.QueryNotFoundError) {
                unauthorized('QUERY_NOT_FOUND');
              } else {
                unauthorized('GRAPHQL_ERROR', _context.t0, 400);
              }

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[8, 25]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.Api = _api2.default;
exports.QueryRepository = _utils.QueryRepository;