import request from '../../helpers/graphql'
import createTable from '../../helpers/table'
import output from '../../helpers/output'

const FLOW_QUERY = `
  query {
    flows: allFlows {
      id
      name
      project {
        id
        name
      }
    }
  }
`

const columns = [{
  name: 'ID',
  key: 'id',
  width: 28,
}, {
  name: 'Project/Flow',
  key: flow => `${flow.project.name}/${flow.name}`,
  minWidth: 30,
}]

export async function handler (args) {
  const resp = await request(args, FLOW_QUERY)
  output.block(createTable(columns, resp.flows), args)
}

export default {
  command: 'list',
  desc: 'List flows',
  handler,
}
