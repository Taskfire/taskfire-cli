// import yargs from 'yargs'
import createClient from '../../helpers/client'
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
  const client = await createClient(args)
  const list = await client.projects.list()
  output.block(createTable(columns, list), args)
}

export default {
  command: 'list',
  desc: 'List projects',
  handler,
}
