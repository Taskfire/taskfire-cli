'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectName = exports.getCwd = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getCwd = exports.getCwd = args => {
  return _path2.default.resolve(process.cwd(), args.dir || '');
};

const getProjectName = exports.getProjectName = async args => {
  // 1. Use the flag
  if (args.p || args.project) return args.p || args.project;

  // 2. Use the directory .taskfirerc
  const cwd = getCwd(args);
  const taskfirercPath = _path2.default.resolve(cwd, '.taskfirerc');
  if (_fsExtra2.default.existsSync(taskfirercPath)) {
    const taskfirerc = await _fsExtra2.default.readJson(_path2.default.resolve(cwd, '.taskfirerc'), { throws: false });
    if (taskfirerc && taskfirerc.project) return taskfirerc.project;
  }

  // 3. Use the default for the user
  return (0, _config.getBasicConfig)(args, 'defaultProject');
};