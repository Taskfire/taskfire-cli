import path from 'path'
import fs from 'fs-extra'
import { getBasicConfig } from './config'

export const getCwd = (args) => {
  return path.resolve(process.cwd(), args.dir)
}

export const getProjectName = async (args) => {
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
