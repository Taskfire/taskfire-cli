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

const FLOW_QUERY = `
  query {
    flows: allFlows {
      id
      name
      project {
        id
        name
      }
    }
  }
`;

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28
}, {
  name: 'Project/Flow',
  key: flow => `${flow.project.name}/${flow.name}`,
  minWidth: 30
}];

async function handler(args) {
  const resp = await (0, _graphql2.default)(args, FLOW_QUERY);
  _output2.default.block((0, _table2.default)(columns, resp.flows), args);
}

exports.default = {
  command: 'list',
  desc: 'List flows',
  handler
};