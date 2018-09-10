import createClient from '../helpers/client'
import output from '../helpers/output'

async function handler (args) {
  const client = await createClient(args)

  const logs = await client.request({
    url: `/runs/${args.runId}/logs`,
    method: 'GET',
  })
  output(logs.join(''))
}

export default {
  command: 'logs <runId>',
  desc: 'Logs for a specific run',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('runId', {
        describe: 'ID for the run',
      })
  },
}
