'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _client = require('../../helpers/client');

var _client2 = _interopRequireDefault(_client);

var _table = require('../../helpers/table');

var _table2 = _interopRequireDefault(_table);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28
}, {
  name: 'Name',
  key: 'name',
  width: 26
}]; // import yargs from 'yargs'
async function handler(args) {
  const client = await (0, _client2.default)(args);
  const list = await client.projects.list();
  _output2.default.block((0, _table2.default)(columns, list), args);
}

exports.default = {
  command: 'list',
  desc: 'List projects',
  handler
};