'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _config = require('../../helpers/config');

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handler(args) {
  const value = await (0, _config.getBasicConfig)(args, args.key);
  _output2.default.space(args);
  _output2.default.accent(value, args);
  _output2.default.space(args);
}

exports.default = {
  command: 'get <key>',
  desc: 'Get config for CLI',
  handler
};