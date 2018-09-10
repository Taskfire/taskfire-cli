'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cliSelect = require('cli-select');

var _cliSelect2 = _interopRequireDefault(_cliSelect);

var _taskfire = require('taskfire');

var _taskfire2 = _interopRequireDefault(_taskfire);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _output = require('./output');

var _output2 = _interopRequireDefault(_output);

var _config = require('./config');

var _args = require('./args');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import taskfire from '../../../taskfire-nodejs/lib/index'
exports.default = async function createClient(args, requireAuth, requireSite = false) {
  const auth = await (0, _auth2.default)(args, requireAuth, requireSite);
  const projectName = await (0, _args.getProjectName)(args);

  const client = (0, _taskfire2.default)(auth.token, {
    project: projectName,
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://api.taskfire.io'
    // debug: true,
  });

  // If we need a project/site then we should
  // ask the user for it (as no default is present)
  if (requireSite && !projectName) {
    const projects = await client.projects.list();

    if (!projects.length) {
      _output2.default.error('You must create a project before deploying your code');
    }

    // Ask the user to select a project
    const selectedIndex = await (0, _cliSelect2.default)({
      values: projects.map(({ name }) => name)
    }).catch(() => {
      _output2.default.error('Project ID required');
    });

    const selectedProject = projects[selectedIndex.id];

    // Set it as the default for the future
    await (0, _config.setBasicConfig)(args, 'defaultProject', selectedProject.name);

    (0, _output2.default)(`Setting ${selectedProject.name} as default config`);

    // Update the client with the selected projectId
    client.options.project = selectedProject.name;
  }

  return client;
};