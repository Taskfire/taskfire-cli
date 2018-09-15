// import yargs from 'yargs'
import list, { handler } from './list'
import create from './create'

export default {
  scriptName: 'taskfire projects',
  command: 'projects',
  desc: 'Manage projects',
  builder: (yargs) => {
    return yargs
      .command(list)
      .command(create)
  },
  handler,
}
