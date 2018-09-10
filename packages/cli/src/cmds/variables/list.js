// import yargs from 'yargs'
import createClient from '../../helpers/client'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const columns = [{
  name: 'Name',
  key: 'name',
  width: 16,
}, {
  name: 'Value',
  key: 'value',
  width: 30,
}]

export async function handler (args) {
  const client = await createClient(args, true, true)
  const list = await client.request({
    url: '/variables',
    method: 'GET',
  })

  if (!list) {
    output.accent('No variables found')
    return
  }

  output.block(createTable(columns, list), args)
}

export default {
  command: 'list',
  desc: 'List variables (and secrets)',
  handler,
}
