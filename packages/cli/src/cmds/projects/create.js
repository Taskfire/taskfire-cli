// import yargs from 'yargs'
import createClient from '../../helpers/client'
// import createTable from '../../helpers/table'
import output from '../../helpers/output'
import { setBasicConfig } from '../../helpers/config'

export async function handler (args) {
  const client = await createClient(args)

  const project = await client.projects.create({
    name: args.name,
  })

  if (args.default) {
    await setBasicConfig(args, 'defaultProject', project.id)
  }

  output.success(`Created project: ${project.name}`)
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
