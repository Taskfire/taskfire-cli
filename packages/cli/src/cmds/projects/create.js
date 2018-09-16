import request from '../../helpers/request'
import output from '../../helpers/output'
import { setBasicConfig } from '../../helpers/args/config'

export async function handler (args) {
  const project = await request(args, {
    method: 'POST',
    url: '/projects',
    body: {
      name: args.name,
    },
  })

  if (args.default) {
    await setBasicConfig(args, 'defaultProject', project.id)
  }

  output.success(`Created project: ${project.name}`, args)
  // output.block(createTable(columns, tasks))
}

export default {
  command: 'create [name]',
  desc: 'Create a new project',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('name', {
        describe: 'name of the new project',
      })
      .option('default', {
        alias: 'd',
        describe: 'Set the new project as the default',
      })
  },
}
