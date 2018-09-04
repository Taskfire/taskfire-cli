// import yargs from 'yargs'
import list, { handler } from './list'

export default {
  command: 'flows',
  desc: 'Manage flows',
  builder: (yargs) => {
    return yargs
      .command(list)
  },
  handler,
}
