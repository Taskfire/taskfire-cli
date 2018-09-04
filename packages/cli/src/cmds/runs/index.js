// import yargs from 'yargs'
import list, { handler } from './list'

export default {
  command: 'runs',
  desc: 'Manage runs',
  builder: (yargs) => {
    return yargs
      .command(list)
  },
  handler,
}
