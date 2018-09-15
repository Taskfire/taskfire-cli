// import taskfire from '../../../taskfire-nodejs/lib/index'
import cliSelect from 'cli-select'
import taskfire from 'taskfire'
import getAuth from './auth'
import output from './output'
import { setBasicConfig } from './config'
import { getProjectName } from './args'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/v1'
  : 'https://api.taskfire.io/v1'

export default async function createClient (args, requireAuth, requireSite = false) {
  const auth = await getAuth(args, requireAuth, requireSite)
  const projectName = await getProjectName(args)

  const client = taskfire(auth.token, {
    project: projectName,
    url: BASE_URL,
    debug: true,
  })

  // If we need a project/site then we should
  // ask the user for it (as no default is present)
  if (requireSite && !projectName) {
    const projects = await client.projects.list()

    if (!projects.length) {
      output.error('You must create a project before deploying your code')
    }

    output('Select a project:')

    // Ask the user to select a project
    const selectedIndex = await cliSelect({
      values: projects.map(({ name }) => name),
    }).catch(() => {
      output.error('Project ID required')
    })

    const selectedProject = projects[selectedIndex.id]

    // Set it as the default for the future
    await setBasicConfig(args, 'defaultProject', selectedProject.name)

    output(`Setting ${selectedProject.name} as default config`)

    // Update the client with the selected projectId
    client.options.project = selectedProject.name
  }

  return client
}
