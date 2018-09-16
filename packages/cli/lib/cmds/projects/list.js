'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;

var _graphql = require('../../helpers/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _table = require('../../helpers/table');

var _table2 = _interopRequireDefault(_table);

var _output = require('../../helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PROJECT_QUERY = `
  query {
    projects: allProjects {
      id
      name
    }
  }
`; // import yargs from 'yargs'


const columns = [{
  name: 'ID',
  key: 'id',
  width: 28
}, {
  name: 'Name',
  key: 'name',
  width: 26
}];

async function handler(args) {
  const list = await (0, _graphql2.default)(args, PROJECT_QUERY);
  _output2.default.block((0, _table2.default)(columns, list.projects), args);
}

exports.default = {
  command: 'list',
  desc: 'List projects',
  handler
};