'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTable;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _cliTable = require('cli-table2');

var _cliTable2 = _interopRequireDefault(_cliTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const chars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: '',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ''
};

const NO_RESOURCE_MSG = `
  0 resources found.
`;

function createTable(columns, rows) {
  if (!rows || rows.length === 0) {
    return NO_RESOURCE_MSG;
  }
  const head = columns.map(({ name }) => _chalk2.default.grey(name));
  const colWidths = columns.map(({ width }) => width || 10);
  const table = new _cliTable2.default({
    head,
    colWidths,
    style: {
      head: [],
      borders: ['black']
    },
    chars
  });
  const data = rows.map(row => columns.map(({ key }) => row[key]));
  table.push(...data);
  return table.toString();
}