'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _request = require('../../helpers/request');

var _request2 = _interopRequireDefault(_request);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

var _config = require('../../helpers/args/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handler(args) {
  const project = await (0, _request2.default)(args, {
    method: 'POST',
    url: '/projects',
    body: {
      name: args.name
    }
  });

  if (args.default) {
    await (0, _config.setBasicConfig)(args, 'defaultProject', project.id);
  }

  _output2.default.success(`Created project: ${project.name}`, args);
  // output.block(createTable(columns, tasks))
}

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