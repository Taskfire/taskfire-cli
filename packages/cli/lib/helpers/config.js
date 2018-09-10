'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getConfigPath;
exports.getAuthConfig = getAuthConfig;
exports.addAuthConfig = addAuthConfig;
exports.setBasicConfig = setBasicConfig;
exports.getBasicConfig = getBasicConfig;

var _os = require('os');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loadJsonFile = require('load-json-file');

var _loadJsonFile2 = _interopRequireDefault(_loadJsonFile);

var _writeJsonFile = require('write-json-file');

var _writeJsonFile2 = _interopRequireDefault(_writeJsonFile);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _set = require('lodash/set');

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dirName = process.env.NODE_ENV === 'development' ? '.taskfire.dev' : '.taskfire';

const defaultAuth = {
  _: 'This is your Taskfire credentials file. DON\'T SHARE!',
  credentials: {}
};

const getAuthConfigPath = args => _path2.default.resolve(getConfigPath(args), './auth.json');

const getBasicConfigPath = args => _path2.default.resolve(getConfigPath(args), './config.json');

function getConfigPath(args) {
  const { configPath } = args;
  if (configPath) {
    return _path2.default.resolve(configPath);
  }
  return _path2.default.resolve((0, _os.homedir)(), `./${dirName}'`);
}

async function getAuthConfig(args) {
  const authPath = getAuthConfigPath(args);
  return _fsExtra2.default.existsSync(authPath) ? (0, _loadJsonFile2.default)(authPath) : null;
}

async function addAuthConfig(args, username, token) {
  const authPath = getAuthConfigPath(args);

  let auth = await getAuthConfig(args);

  if (!auth) {
    auth = defaultAuth;
  }

  // Update the auth config
  auth.credentials[username] = {
    type: 'jwt',
    token
  };
  auth.defaultAuth = username;

  await setBasicConfig('defaultProject', null);

  // Save the file
  return (0, _writeJsonFile2.default)(authPath, auth);
}

async function setBasicConfig(args, key, value) {
  const configPath = getBasicConfigPath(args);
  let json = {};
  if (_fsExtra2.default.existsSync(configPath)) {
    json = await _fsExtra2.default.readJson(configPath);
  }
  (0, _set2.default)(json, key, value);
  await _fsExtra2.default.outputJson(configPath, json, {
    spaces: 2
  });
  return value;
}

async function getBasicConfig(args, key) {
  const configPath = getBasicConfigPath(args);
  if (!_fsExtra2.default.existsSync(configPath)) return null;
  const json = await _fsExtra2.default.readJson(configPath);
  return (0, _get2.default)(json, key);
}