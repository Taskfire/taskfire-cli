import { getBasicConfig } from '../../helpers/config'
import output from '../../helpers/output'

export async function handler (args) {
  const value = await getBasicConfig(args, args.key)
  output.space()
  output.accent(value)
  output.space()
}

export default {
  command: 'get <key>',
  desc: 'Get config for CLI',
  handler,
}
