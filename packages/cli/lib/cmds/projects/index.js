'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import yargs from 'yargs'
exports.default = {
  command: 'projects',
  desc: 'Manage projects',
  builder: yargs => {
    return yargs.command(_list2.default).command(_create2.default);
  },
  handler: _list.handler
};