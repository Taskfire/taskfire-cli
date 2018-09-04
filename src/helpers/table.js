import chalk from 'chalk'
import Table from 'cli-table2'

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
  middle: '',
}

const NO_RESOURCE_MSG = `
  0 resources found.
`

export default function createTable (columns, rows) {
  if (!rows || rows.length === 0) {
    return NO_RESOURCE_MSG
  }
  const head = columns.map(({ name }) => chalk.grey(name))
  const colWidths = columns.map(({ width }) => width || 10)
  const table = new Table({
    head,
    colWidths,
    style: {
      head: [],
      borders: ['black'],
    },
    chars,
  })
  const data = rows.map(row => columns.map(({ key }) => row[key]))
  table.push(...data)
  return table.toString()
}
