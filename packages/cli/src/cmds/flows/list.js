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
  const tasks = await client.flows.list()
  output.block(createTable(columns, tasks))
}

export default {
  command: 'list',
  desc: 'List flows',
  handler,
}
