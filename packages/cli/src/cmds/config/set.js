import { setBasicConfig } from '../../helpers/config'
import output from '../../helpers/output'

export async function handler (args) {
  await setBasicConfig(args, args.key, args.value)

  output.space()
  output.accent(`Set ${args.key} to ${args.value}`)
  output.space()
}

export default {
  command: 'set <key> <value>',
  desc: 'Set config for CLI',
  handler,
}
