'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _queryRepository = require('../utils/query-repository');

var _queryRepository2 = _interopRequireDefault(_queryRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleError = function handleError(error, res) {
  var statusCode = error instanceof _queryRepository.QueryNotFoundError ? 404 : 422;
  res.status(statusCode).json({ error: error.message });
};

exports.default = function (store) {
  var router = _express2.default.Router();
  var repository = new _queryRepository2.default(store);

  router.get('/queries', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var queries;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return repository.entries();

            case 2:
              queries = _context.sent;

              res.json(queries);

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  router.get('/queries/:id(*)', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var query;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return repository.get(req.params.id);

            case 3:
              query = _context2.sent;

              res.json(query);
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);

              handleError(_context2.t0, res);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  router.post('/queries', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var result;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return repository.put(req.body.query);

            case 3:
              result = _context3.sent;

              res.status(201).json(result);
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              res.status(422).json({ error: _context3.t0.message });

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  router.put('/queries/:id(*)', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var _req$body, enabled, operationName, newProperties, query;

      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body = req.body, enabled = _req$body.enabled, operationName = _req$body.operationName;
              newProperties = { enabled: enabled, operationName: operationName

                // Manually check each updatable property since they are only 2
              };
              if (typeof enabled !== 'boolean') delete newProperties.enabled;
              if (!operationName) delete newProperties.operationName;

              _context4.prev = 4;
              _context4.next = 7;
              return repository.update(req.params.id, newProperties);

            case 7:
              query = _context4.sent;

              res.json(query);
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](4);

              handleError(_context4.t0, res);

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[4, 11]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  router.delete('/queries/:id(*)', function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return repository.delete(req.params.id);

            case 3:
              res.status(200).end();
              _context5.next = 9;
              break;

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5['catch'](0);

              handleError(_context5.t0, res);

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 6]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  return router;
};