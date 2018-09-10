import createClient from '../../helpers/client'
import output from '../../helpers/output'

export async function handler (args) {
  const client = await createClient(args)
  const resp = await client.request({
    method: 'PUT',
    url: `/variables/${args.name}`,
    body: {
      name: args.name,
      value: args.value,
      secret: !!(args.secret || args.s),
    },
  })

  output.space(args)
  output.accent(`Set ${resp.name} to ${resp.value}`, args)
  output.space(args)
}

export default {
  command: 'set <name> <value>',
  desc: 'Set config for CLI',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('name', {
        describe: 'Name of the variable',
      })
      .positional('value', {
        describe: 'Value of the variable',
      })
      .option('secret', {
        describe: 'Variable is a secret (will be hidden in console)',
      })
  },
}
