'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _request = require('../../helpers/request');

var _request2 = _interopRequireDefault(_request);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handler(args) {
  const flow = await (0, _request2.default)(args, {
    method: 'GET',
    url: `/flows/${args.flow_id}`
  });

  if (!flow) {
    _output2.default.accent('No resource found');
  }

  _output2.default.record(flow, args);
}

exports.default = {
  command: 'describe <flow_id>',
  desc: 'Describe the specified flow',
  handler,
  builder: yargs => {
    return yargs.positional('flow_id', {
      describe: 'ID of the flow'
    });
  }
};