'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDeploymentFlowName;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _gitRepoName = require('git-repo-name');

var _gitRepoName2 = _interopRequireDefault(_gitRepoName);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _util = require('../util');

var _args = require('../args');

var _lang = require('../lang');

var _lang2 = _interopRequireDefault(_lang);

var _output = require('../output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const packageFiles = ['taskfire.json', 'taskfire.yml', 'taskfire.yaml', '.taskfirerc', 'package.json', // Nodejs
'app.json', // Ruby
'composer.json', // PHP
'app.yml', 'app.yaml'];

function getDeploymentFlowName(args) {
  if (args.flow) return args.flow;

  const cwd = (0, _args.getCwd)(args);

  // Otherwise find the name from package
  const packageName = getPackageName(args);
  if (packageName) return packageName;

  // Otherwise use git name (if git repo and remote-url)
  if (_fsExtra2.default.existsSync(_path2.default.resolve(cwd, '.git'))) {
    let gitName;
    try {
      gitName = _gitRepoName2.default.sync(cwd);
    } catch (e) {
      _output2.default.info('No remote-url found in .git');
    }

    if (gitName) return gitName;
  }

  // Otherwise use lang + directory name
  const lang = (0, _lang2.default)(args);
  const parentDir = _path2.default.basename(cwd);
  return lang ? `${lang.name}-${parentDir}` : parentDir;
}

function getPackageName(args) {
  const cwd = (0, _args.getCwd)(args);
  const fileNames = packageFiles.filter(fileName => _fsExtra2.default.existsSync(_path2.default.resolve(cwd, fileName)));

  // Check each for a name
  return (0, _util.forEach)(fileNames, fileName => {
    const ext = fileName.split('.').pop();
    const filePath = _path2.default.resolve(cwd, fileName);

    let file;
    if (ext === 'json') file = _fsExtra2.default.readJsonSync(filePath, { throw: false });else if (fileName === '.taskfirerc') {
      file = _fsExtra2.default.readJsonSync(filePath, { throw: false });
      file = file && { name: file.default.flow };
    } else if (ext === 'yml' || ext === 'yaml') {
      file = _jsYaml2.default.safeLoad(_fsExtra2.default.readFileSync(filePath, 'utf8'));
    }

    if (file && file.name) return file.name;

    return undefined;
  });
}