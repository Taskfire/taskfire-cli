#!/usr/bin/env node
'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _flows = require('./cmds/flows');

var _flows2 = _interopRequireDefault(_flows);

var _login = require('./cmds/login');

var _login2 = _interopRequireDefault(_login);

var _runs = require('./cmds/runs');

var _runs2 = _interopRequireDefault(_runs);

var _deploy = require('./cmds/deploy');

var _deploy2 = _interopRequireDefault(_deploy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import chalk from 'chalk'
_yargs2.default.usage('Usage: taskfire <command> [options]').scriptName('taskfire').command(_flows2.default).command(_runs2.default).command(_deploy2.default).command(_login2.default).option('token', {
  alias: 't',
  describe: 'Authentication token'
}).option('project', {
  alias: 'p',
  describe: 'Project to target'
}).fail((msg, err) => {
  console.log('');
  console.log(msg || err.message);
  if (process.env.NODE_ENV !== 'production') {
    throw err;
  }
  // process.exit(1)
}).demandCommand().recommendCommands().help('h').parse();