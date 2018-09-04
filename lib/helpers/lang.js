'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLanguage;
// import path from 'path'
// import fs from 'fs-extra'

const languageMap = exports.languageMap = [{
  lang: 'docker',
  file: 'dockerfile'
}, {
  lang: 'nodejs',
  file: 'package.json'
}, {
  lang: 'ruby',
  file: 'Gemfile'
}];

function getLanguage(args) {
  languageMap.filter(lang => {});
}