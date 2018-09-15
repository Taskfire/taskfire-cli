import request from '../helpers/request'
import output from '../helpers/output'

async function handler (args) {
  const run = await request(args, {
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
