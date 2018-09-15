#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _raven = require('raven');

var _raven2 = _interopRequireDefault(_raven);

var _flows = require('./cmds/flows');

var _flows2 = _interopRequireDefault(_flows);

var _projects = require('./cmds/projects');

var _projects2 = _interopRequireDefault(_projects);

var _login = require('./cmds/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('./cmds/signup');

var _signup2 = _interopRequireDefault(_signup);

var _runs = require('./cmds/runs');

var _runs2 = _interopRequireDefault(_runs);

var _run = require('./cmds/run');

var _run2 = _interopRequireDefault(_run);

var _logs = require('./cmds/logs');

var _logs2 = _interopRequireDefault(_logs);

var _images = require('./cmds/images');

var _images2 = _interopRequireDefault(_images);

var _variables = require('./cmds/variables');

var _variables2 = _interopRequireDefault(_variables);

var _deploy = require('./cmds/deploy');

var _deploy2 = _interopRequireDefault(_deploy);

var _config = require('./cmds/config');

var _config2 = _interopRequireDefault(_config);

var _init = require('./cmds/init');

var _init2 = _interopRequireDefault(_init);

var _output = require('./helpers/output');

var _output2 = _interopRequireDefault(_output);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = _yargs2.default.usage('Usage: taskfire <command> [options]').scriptName('taskfire').command(_flows2.default).command(_projects2.default).command(_runs2.default).command(_run2.default).command(_logs2.default).command(_deploy2.default).command(_images2.default).command(_variables2.default).command(_config2.default).command(_login2.default).command(_signup2.default).command(_init2.default).option('token', {
  alias: 't',
  describe: 'Authentication token'
}).option('project', {
  alias: 'p',
  describe: 'Project to target'
}).option('silent', {
  alias: 's',
  describe: 'Silent mode (no stdout)'
}).strict().demandCommand(1).fail((msg, err) => {
  console.log('ERROR', msg, err);
  if (err) {
    // Need to make sure we filter out known errors
    _raven2.default.captureException(err);
  }
  _output2.default.space();
  if (msg || err && err.message) {
    _output2.default.accent(msg || err && err.message);
    _output2.default.space();
  }
  _yargs2.default.showHelp();
}).recommendCommands().help('h');
// .help('help')
// .parse()

exports.default = cli;