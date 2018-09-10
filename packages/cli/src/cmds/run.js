import createClient from '../helpers/client'
import output from '../helpers/output'

async function handler (args) {
  const client = await createClient(args)

  const run = await client.request({
    url: `/flows/${args.flowId}/run`,
    method: 'PUT',
  })

  output.success('Flow started')
  output.accent(`Run ID: ${run.id}`)
}

export default {
  command: 'run <flowId>',
  desc: 'Run a flow',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('flowId', {
        describe: 'ID for the flow to run',
      })
  },
}
