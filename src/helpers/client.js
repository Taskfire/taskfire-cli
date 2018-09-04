// import taskfire from '../../../taskfire-nodejs/lib/index'
import cliSelect from 'cli-select'
import taskfire from 'taskfire'
import getAuth from './auth'
import output from './output'
import { setBasicConfig, getProjectName } from './config'

export default async function createClient (args, requireAuth, requireSite = false) {
  const auth = await getAuth(args, requireAuth, requireSite)
  const projectName = await getProjectName(args)

  const client = taskfire(auth.token, {
    projectId: projectName,
    url: 'http://localhost:4000',
    // debug: true,
  })

  // If we need a project/site then we should
  // ask the user for it (as no default is present)
  if (requireSite && !projectName) {
    const projects = await client.projects.list()

    if (!projects.length) {
      output.error('You must create a project before deploying your code')
    }

    // Ask the user to select a project
    const selectedIndex = await cliSelect({
      values: projects.map(({ name }) => name),
    }).catch(() => {
      output.error('Project ID required')
    })

    const selectedProject = projects[selectedIndex.id]

    // Set it as the default for the future
    await setBasicConfig(args, 'defaultProject', selectedProject.id)

    output(`Setting ${selectedProject.name} as default config`)

    // Update the client with the selected projectId
    client.options.projectId = selectedProject.id
  }

  return client
}
