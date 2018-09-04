'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCwd = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCwd = exports.getCwd = args => {
  return _path2.default.resolve(process.cwd(), args.dir);
};