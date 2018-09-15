// import yargs from 'yargs'
import request from '../../helpers/request'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28,
}, {
  name: 'Status',
  key: 'status',
  width: 26,
}]

export async function handler (args) {
  const tasks = await request(args, {
    method: 'GET',
    url: '/runs',
  })

  output.block(createTable(columns, tasks), args)
}

export default {
  command: 'list',
  desc: 'List runs',
  handler,
}
