'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _os = require('os');

var _path = require('path');

const humanizePath = path => {
  const resolved = (0, _path.resolve)(path);
  const _homedir = (0, _os.homedir)();
  if (resolved.indexOf(_homedir) === 0) {
    return `~${resolved.substr(_homedir.length)}`;
  }
  return resolved;
};

exports.default = humanizePath;