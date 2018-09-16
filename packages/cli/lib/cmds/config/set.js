'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _config = require('../../helpers/args/config');

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handler(args) {
  await (0, _config.setBasicConfig)(args, args.key, args.value);

  _output2.default.space(args);
  _output2.default.accent(`Set ${args.key} to ${args.value}`, args);
  _output2.default.space(args);
}

exports.default = {
  command: 'set <key> <value>',
  desc: 'Set config for CLI',
  handler
};