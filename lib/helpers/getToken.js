'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getToken;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_TOKEN = `
  ${_chalk2.default.red('No authentication token')}

  Use ${_chalk2.default.cyanBright('$ taskfire login')}
`;

function getToken(args) {
  const token = args.t || args.token;

  if (!token) {
    // TODO: Get token from the cache
  }

  if (!token) {
    (0, _handleError2.default)(NO_TOKEN);
  }

  return token;
}