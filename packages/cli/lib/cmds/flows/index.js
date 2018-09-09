'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _describe = require('./describe');

var _describe2 = _interopRequireDefault(_describe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import yargs from 'yargs'
exports.default = {
  command: 'flows',
  desc: 'Manage flows',
  builder: yargs => {
    return yargs.command(_list2.default).command(_describe2.default);
  },
  handler: _list.handler
};