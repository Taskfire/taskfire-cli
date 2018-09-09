// import yargs from 'yargs'
import list, { handler } from './list'

export default {
  command: 'images',
  desc: 'Manage images',
  builder: (yargs) => {
    return yargs
      .command(list)
  },
  handler,
}
