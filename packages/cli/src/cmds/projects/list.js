// import yargs from 'yargs'
import request from '../../helpers/graphql'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const PROJECT_QUERY = `
  query {
    projects: allProjects {
      id
      name
    }
  }
`

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
  const list = await request(args, PROJECT_QUERY)
  output.block(createTable(columns, list.projects), args)
}

export default {
  command: 'list',
  desc: 'List projects',
  handler,
}
