import { setBasicConfig } from '../../helpers/args/config'
import output from '../../helpers/output'

export async function handler (args) {
  await setBasicConfig(args, args.key, args.value)

  output.space(args)
  output.accent(`Set ${args.key} to ${args.value}`, args)
  output.space(args)
}

export default {
  command: 'set <key> <value>',
  desc: 'Set config for CLI',
  handler,
}
