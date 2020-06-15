'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseASTQuery = undefined;

var _printer = require('graphql/language/printer');

var _parser = require('graphql/language/parser');

var _graphql = require('graphql');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hashQuery = function hashQuery(query) {
  return _crypto2.default.createHash('sha256').update(query).digest('base64');
};

exports.default = function (query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { requireOperationName: true };

  var queryAST = (0, _parser.parse)(query);
  var operationAST = (0, _graphql.getOperationAST)(queryAST);
  var normalizedQuery = (0, _printer.print)(queryAST);

  if (options.requireOperationName && !operationAST.name) {
    throw new Error('\n      Invalid Query: \'Query must have an operation name\'.\n      e.g.\n        query MyQueryName {\n          firstName,\n          lastName\n        }\n    ');
  }

  return {
    queryId: hashQuery(normalizedQuery),
    operationName: operationAST.name && operationAST.name.value,
    normalizedQuery: normalizedQuery
  };
};

var parseASTQuery = exports.parseASTQuery = function parseASTQuery(queryAST) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { requireOperationName: true };

  var operationAST = (0, _graphql.getOperationAST)(queryAST);
  var normalizedQuery = (0, _printer.print)(queryAST);

  if (options.requireOperationName && !operationAST.name) {
    throw new Error('\n      Invalid Query: \'Query must have an operation name\'.\n      e.g.\n        query MyQueryName {\n          firstName,\n          lastName\n        }\n    ');
  }

  return {
    queryId: hashQuery(normalizedQuery),
    operationName: operationAST.name && operationAST.name.value,
    normalizedQuery: normalizedQuery
  };
};