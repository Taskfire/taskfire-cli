'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _pad = require('pad');

var _pad2 = _interopRequireDefault(_pad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function output(msg, args = {}) {
  if (args.s || args.silent) return;
  if (process.env.NODE_ENV !== 'test') console.log(msg);
}

output.block = function outputBlock(msg, args) {
  output(['', msg, ''].join('\n'), args);
};

output.error = function outputError(msg, exit = true) {
  output(_chalk2.default.red(msg));
  if (exit) process.exit(1);
};

output.success = function outputSuccess(msg, args) {
  output(_chalk2.default.green(msg), args);
};

output.info = function outputInfo(msg, args) {
  output(`${_chalk2.default.cyan('[INFO]')} ${msg}'`, args);
};

output.accent = function outputAccent(msg, args) {
  output(`${_chalk2.default.grey('>')} ${msg}`, args);
};

output.space = function outputSpace(args) {
  output('', args);
};

output.record = function outputRecord(record, args) {
  let length = 0;

  // Get the maximum length
  (0, _forEach2.default)(record, (val, key) => {
    length = Math.max(key.length + 2, length);
  });

  (0, _forEach2.default)(record, (val, key) => {
    const name = `${key}:`;
    output(`${(0, _pad2.default)(name, length)}${val}`, args);
  });
};

exports.default = output;