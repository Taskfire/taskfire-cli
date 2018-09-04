'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function output(msg) {
  console.log(msg);
}

output.block = function outputBlock(msg) {
  output(['', msg, ''].join('\n'));
};

output.error = function outputError(msg, exit = true) {
  output(_chalk2.default.red(msg));
  if (exit) process.exit(1);
};

output.success = function outputSuccess(msg) {
  output(_chalk2.default.green(msg));
};

output.accent = function outputAccent(msg) {
  output(`${_chalk2.default.grey('>')} ${msg}`);
};

output.space = function outputSpace() {
  output('');
};

exports.default = output;