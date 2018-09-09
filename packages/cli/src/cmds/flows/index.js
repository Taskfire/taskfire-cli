// import yargs from 'yargs'
import list, { handler } from './list'
import describe from './describe'

export default {
  command: 'flows',
  desc: 'Manage flows',
  builder: (yargs) => {
    return yargs
      .command(list)
      .command(describe)
  },
  handler,
}
