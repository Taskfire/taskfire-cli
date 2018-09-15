import request from '../helpers/request'
import output from '../helpers/output'

async function handler (args) {
  const logs = await request(args, {
    url: `/runs/${args.runId}/logs`,
    method: 'GET',
  })

  output(logs.join('\n'))
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
