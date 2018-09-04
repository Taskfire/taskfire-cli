'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handlerError;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handlerError(err, exit = true) {
  console.log(err);
  if (exit) process.exit(1);
}