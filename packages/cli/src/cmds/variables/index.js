// import yargs from 'yargs'
import list, { handler } from './list'
import set from './set'

export default {
  command: 'variables',
  desc: 'Manage variables (and secrets)',
  builder: (yargs) => {
    return yargs
      .command(list)
      .command(set)
  },
  handler,
}
