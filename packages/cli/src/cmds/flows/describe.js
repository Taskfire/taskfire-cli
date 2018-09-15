import request from '../../helpers/request'
import output from '../../helpers/output'

export async function handler (args) {
  const flow = await request(args, {
    method: 'GET',
    url: `/flows/${args.flow_id}`,
  })

  if (!flow) {
    output.accent('No resource found')
  }

  output.record(flow, args)
}

export default {
  command: 'describe <flow_id>',
  desc: 'Describe the specified flow',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('flow_id', {
        describe: 'ID of the flow',
      })
  },
}
