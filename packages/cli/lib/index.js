#!/usr/bin/env node
'use strict';

var _raven = require('raven');

var _raven2 = _interopRequireDefault(_raven);

var _cli = require('./cli');

var _cli2 = _interopRequireDefault(_cli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  _raven2.default.config('https://c3fedd715c0c449096a1278564487215@sentry.io/1281652').install();
}

_cli2.default.parse();