'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _matchSorter = require('match-sorter');

var _matchSorter2 = _interopRequireDefault(_matchSorter);

var _globGitignore = require('glob-gitignore');

var _getName = require('../helpers/deploy/get-name');

var _getName2 = _interopRequireDefault(_getName);

var _output = require('../helpers/output');

var _output2 = _interopRequireDefault(_output);

var _args = require('../helpers/args');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const GIT_URL = 'https://github.com/Taskfire/taskfire-cli/tree/v0.2.0/packages/cli/templates'

_inquirer2.default.registerPrompt('autocomplete', _inquirerAutocompletePrompt2.default);

async function handler(args) {
  const prompts = [];
  const files = await _fsExtra2.default.readdir(_path2.default.resolve(__dirname, '../../templates/'));

  // Remove non-exampole files
  let exampleList = files.filter(d => !d.startsWith('.'));

  // Move basic to the top of the list
  exampleList = ['basic', ...exampleList.filter(d => d !== 'basic')];
  // exampleList = [...exampleList, 'custom']

  if (!args.name) {
    prompts.push({
      type: 'input',
      name: 'name',
      message: 'name',
      default: await (0, _getName2.default)(args)
    });
  }

  // if (!args.project) {
  //   prompts.push({
  //     type: 'input',
  //     name: 'project',
  //     message: 'project',
  //     default: await getProjectName(args),
  //   })
  // }

  if (!args.template) {
    prompts.push({
      type: 'autocomplete',
      name: 'template',
      message: 'Select a template below...',
      source: async (answersSoFar, input) => {
        return !input ? exampleList : (0, _matchSorter2.default)(exampleList, input);
      }
    });
  }

  const shouldPrompt = !(args.s || args.silent) && prompts.length > 0;
  const answers = shouldPrompt ? await _inquirer2.default.prompt(prompts) : {};

  const name = args.name || answers.name;
  const template = args.template || answers.template;
  const project = args.project || args.p; // || answers.p

  if (!exampleList.includes(template)) {
    _output2.default.error('Invalid flow template specified');
  }

  const dest = (0, _args.getCwd)(args);

  // Check for existing directory
  if (_fsExtra2.default.existsSync(dest) && !(args.force && args.f)) {
    const { overwrite } = await _inquirer2.default.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Overwrite existing directory?'
    }]);
    if (!overwrite) {
      _output2.default.error('Init cancelled!');
    }
  }

  _output2.default.accent(`Copying template to ${dest}`, args);

  const pkgDir = _path2.default.resolve(__dirname, `../../templates/${template}`);
  const filePaths = await (0, _globGitignore.glob)(['**'], {
    cwd: pkgDir,
    nodir: true
    // realpath: true,
  });

  filePaths.forEach(filePath => {
    const buff = _fsExtra2.default.readFileSync(_path2.default.resolve(pkgDir, filePath), 'utf-8');
    _fsExtra2.default.outputFileSync(_path2.default.resolve(dest, filePath), buff);
  });

  // await fs.copy(path.resolve(__dirname, `../../templates/${template}`), dest)
  await _fsExtra2.default.outputJson(_path2.default.resolve(dest, '.taskfirerc'), {
    default: {
      project,
      flow: name
    }
  });

  if (name) _output2.default.success(`Flow ${name} created`, args);else _output2.default.success('Flow created');
}

exports.default = {
  command: 'init [dir]',
  desc: 'Initialise a new flow',
  builder: yargs => {
    return yargs.positional('dir', {
      describe: 'directory to deploy',
      default: './'
    }).option('name', {
      describe: 'Name of the flow'
    }).option('template', {
      describe: 'Template to use for the flow'
    }).option('force', {
      alias: 'f',
      describe: 'Force init even if existing dir exists'
    });
  },
  handler
};