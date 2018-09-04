'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  command: 'flows',
  desc: 'Manage flows',
  builder: yargs => {
    return yargs.command(_list2.default);
  },
  handler: _list.handler
}; // import yargs from 'yargs'