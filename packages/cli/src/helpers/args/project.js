import fs from 'fs-extra'
import path from 'path'
import cliSelect from 'cli-select'
import request from '../request'
import { getCwd } from './paths'
import { getBasicConfig } from './config'
import output from '../output'

export async function getProjectName (args, force) {
  // If we need a project/site then we should
  // ask the user for it (as no default is present)
  const project = searchForProjectName(args)
  if (project) return project

  // We don't have a project still
  if (force) {
    return askForProject(args)
  }

  // We couldn't find a projectName
  return null
}

export async function searchForProjectName (args) {
  // 1. Use the flag
  if (args.p || args.project) return args.p || args.project

  // 2. Use the directory .taskfirerc
  const cwd = getCwd(args)
  const taskfirercPath = path.resolve(cwd, '.taskfirerc')
  if (fs.existsSync(taskfirercPath)) {
    const taskfirerc = await fs.readJson(path.resolve(cwd, '.taskfirerc'), { throws: false })
    if (taskfirerc && taskfirerc.project) return taskfirerc.project
  }

  // 3. Use the default for the user
  return getBasicConfig(args, 'defaultProject')
}

export async function askForProject (args) {
  const projects = await request(args, {
    method: 'GET',
    url: '/projects',
  }, false, false)

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

  // if (setAsDefault) {
  //   await setBasicConfig(args, 'defaultProject', selectedProject.name)
  //   output(`Setting ${selectedProject.name} as default config`)
  // }

  return selectedProject.name
}
