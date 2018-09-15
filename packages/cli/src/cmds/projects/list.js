// import yargs from 'yargs'
import request from '../../helpers/request'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28,
}, {
  name: 'Name',
  key: 'name',
  width: 26,
}]

export async function handler (args) {
  const list = await request(args, {
    method: 'GET',
    url: '/projects',
  })
  output.block(createTable(columns, list), args)
}

export default {
  command: 'list',
  desc: 'List projects',
  handler,
}
