'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _set = require('./set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import yargs from 'yargs'
exports.default = {
  command: 'config',
  desc: 'Configure CLI',
  builder: yargs => {
    return yargs.command(_set2.default).command(_get2.default);
  }
};