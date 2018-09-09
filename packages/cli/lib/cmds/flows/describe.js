'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _client = require('../../helpers/client');

var _client2 = _interopRequireDefault(_client);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import yargs from 'yargs'
async function handler(args) {
  const client = await (0, _client2.default)(args);
  const flows = await client.flows.list({
    where: {
      name: args.name
    }
  });

  if (!flows || !flows[0]) {
    _output2.default.accent('No resource found');
  }

  _output2.default.record(flows[0], args);
}
// import createTable from '../../helpers/table'
exports.default = {
  command: 'describe <name>',
  desc: 'Describe the specified flow',
  handler,
  builder: yargs => {
    return yargs.positional('name', {
      describe: 'name of the flow'
    });
  }
};