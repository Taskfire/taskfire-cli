'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUploadPaths = getUploadPaths;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _findUp = require('find-up');

var _findUp2 = _interopRequireDefault(_findUp);

var _globGitignore = require('glob-gitignore');

var _ignore = require('ignore');

var _ignore2 = _interopRequireDefault(_ignore);

var _ignoreByDefault = require('ignore-by-default');

var _ignoreByDefault2 = _interopRequireDefault(_ignoreByDefault);

var _args = require('../args');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ignoreFiles = ['.taskfireignore', '.dockerignore', '.gitignore']

async function getUploadPaths(args) {
  const cwd = (0, _args.getCwd)(args);

  // Find a .gitignore
  const gitIgnorePath = await (0, _findUp2.default)('.gitignore', {
    cwd
  });

  const gitIgnore = gitIgnorePath && _fsExtra2.default.readFileSync(gitIgnorePath).toString();

  return (0, _globGitignore.glob)(['**'], {
    cwd,
    nodir: true,
    realpath: true,
    ignore: (0, _ignore2.default)().add(gitIgnore).add(_ignoreByDefault2.default.directories)
  });
}