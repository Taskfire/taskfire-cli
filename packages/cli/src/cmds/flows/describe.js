// import yargs from 'yargs'
import createClient from '../../helpers/client'
// import createTable from '../../helpers/table'
import output from '../../helpers/output'

export async function handler (args) {
  const client = await createClient(args)
  const flows = await client.flows.list({
    where: {
      name: args.name,
    },
  })

  if (!flows || !flows[0]) {
    output.accent('No resource found')
  }

  output.record(flows[0], args)
}

export default {
  command: 'describe <name>',
  desc: 'Describe the specified flow',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('name', {
        describe: 'name of the flow',
      })
  },
}
