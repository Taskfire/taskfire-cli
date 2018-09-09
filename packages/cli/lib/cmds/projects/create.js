'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _client = require('../../helpers/client');

var _client2 = _interopRequireDefault(_client);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

var _config = require('../../helpers/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import createTable from '../../helpers/table'
async function handler(args) {
  const client = await (0, _client2.default)(args);

  const project = await client.projects.create({
    name: args.name
  });

  if (args.default) {
    await (0, _config.setBasicConfig)(args, 'defaultProject', project.id);
  }

  _output2.default.success(`Created project: ${project.name}`, args);
  // output.block(createTable(columns, tasks))
} // import yargs from 'yargs'
exports.default = {
  command: 'create [name]',
  desc: 'Create a new project',
  handler,
  builder: yargs => {
    return yargs.positional('name', {
      describe: 'name of the new project'
    }).option('default', {
      alias: 'd',
      describe: 'Set the new project as the default'
    });
  }
};