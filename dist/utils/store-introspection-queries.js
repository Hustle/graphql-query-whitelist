'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _path = require('path');

var _graphql = require('graphql');

var _package = require('graphql/package.json');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOperationNameFn = function getOperationNameFn(file) {
  var filename = (0, _path.basename)(file, '.graphql');

  var _filename$match = filename.match(/^(graphi?ql).*?([\d.]+)$/),
      _filename$match2 = (0, _slicedToArray3.default)(_filename$match, 3),
      app = _filename$match2[1],
      version = _filename$match2[2];

  app = app.replace(/[gql]/g, function (letter) {
    return letter.toUpperCase();
  });

  return app + ' ' + version + ' introspection query';
};

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(repository) {
    var operationName, introspectionQueriesPath;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            operationName = getOperationNameFn('graphql-introspection-query-' + _package.version + '.graphql');
            introspectionQueriesPath = (0, _path.join)(__dirname, 'queries');
            return _context.abrupt('return', _promise2.default.all([repository.put(_graphql.introspectionQuery, { operationName: operationName }), (0, _.storeQueriesFromDir)(repository, introspectionQueriesPath, { getOperationNameFn: getOperationNameFn })]).then(function () {
              console.log('Storing bundled introspection query for version ' + _package.version);
              console.log('Introspection queries stored successfully');
            }));

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function storeIntrospectionQueries(_x) {
    return _ref.apply(this, arguments);
  }

  return storeIntrospectionQueries;
}();