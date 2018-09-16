'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

var _config = require('./args/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_TOKEN_MSG = `
  ${_chalk2.default.red('No authentication token')}

  Use ${_chalk2.default.cyanBright('$ taskfire login')} to login
  Or ${_chalk2.default.cyanBright('$ taskfire signup')} to create a new account
`;

exports.default = async function getAuth(args, requireAuth = true) {
  let token = args.t || args.token;

  if (!token) {
    // TODO: Get token from the cache
    const auth = await (0, _config.getAuthConfig)(args);
    if (auth) {
      // eslint-disable-next-line
      token = auth.credentials[auth.defaultAuth].token;
    }
  }

  if (!token && requireAuth) {
    (0, _errors2.default)(NO_TOKEN_MSG);
  }

  return token;
};