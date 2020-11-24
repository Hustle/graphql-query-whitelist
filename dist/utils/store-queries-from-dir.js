'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueriesFromDir = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findQueryFiles = function findQueryFiles(dir) {
  return new _promise2.default(function (resolve, reject) {
    var resolvePath = function resolvePath() {
      var filename = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return _path2.default.resolve(dir, filename);
    };

    console.log('Searching for queries in \'' + resolvePath() + '\'');

    _fs2.default.readdir(dir, function (err, files) {
      if (err) return reject(err);
      resolve(files.filter(function (file) {
        return (/\.graphql$/.test(file)
        );
      }).map(resolvePath));
    });
  });
};

var readQueryFromFile = function readQueryFromFile(file) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.readFile(file, function (err, data) {
      if (err) return reject(err);
      resolve(data.toString());
    });
  });
};

var getQueriesFromDir = exports.getQueriesFromDir = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dir) {
    var files;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return findQueryFiles(dir);

          case 2:
            files = _context2.sent;
            return _context2.abrupt('return', _promise2.default.all(files.map(function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(filename) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return readQueryFromFile(filename);

                      case 2:
                        _context.t0 = _context.sent;
                        _context.t1 = filename;
                        return _context.abrupt('return', {
                          query: _context.t0,
                          filename: _context.t1
                        });

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }())));

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getQueriesFromDir(_x2) {
    return _ref.apply(this, arguments);
  };
}();

var identityFn = function identityFn(input) {
  return input;
};

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(repository, dir) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var queryFiles, getOperationNameFn;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return findQueryFiles(dir);

          case 2:
            queryFiles = _context4.sent;
            getOperationNameFn = options.getOperationNameFn || identityFn;
            return _context4.abrupt('return', _promise2.default.all(queryFiles.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(file) {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        console.log('Storing query from ' + file);
                        _context3.t0 = repository;
                        _context3.next = 4;
                        return readQueryFromFile(file);

                      case 4:
                        _context3.t1 = _context3.sent;
                        _context3.t2 = { operationName: getOperationNameFn(file) };
                        return _context3.abrupt('return', _context3.t0.put.call(_context3.t0, _context3.t1, _context3.t2));

                      case 7:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function (_x7) {
                return _ref4.apply(this, arguments);
              };
            }())));

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();