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
  console.log('hllo')
  const client = await createClient(args)
  console.log('hllo 2')
  const list = await client.projects.list()
  console.log('hllo 3')
  output.block(createTable(columns, list), args)
}

export default {
  command: 'list',
  desc: 'List projects',
  handler,
}
