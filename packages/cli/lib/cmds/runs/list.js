'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _request = require('../../helpers/request');

var _request2 = _interopRequireDefault(_request);

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
  name: 'Status',
  key: 'status',
  width: 26
}]; // import yargs from 'yargs'
async function handler(args) {
  const tasks = await (0, _request2.default)(args, {
    method: 'GET',
    url: '/runs'
  });

  _output2.default.block((0, _table2.default)(columns, tasks), args);
}

exports.default = {
  command: 'list',
  desc: 'List runs',
  handler
};