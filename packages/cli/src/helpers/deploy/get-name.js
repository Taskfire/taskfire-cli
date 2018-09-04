import path from 'path'
import fs from 'fs-extra'
import repoName from 'git-repo-name'
import yml from 'js-yaml'
import { forEach } from '../util'
import { getCwd } from '../args'
import getLanguage from '../lang'

const packageFiles = [
  'taskfire.json',
  'taskfire.yml',
  'taskfire.yaml',
  'package.json', // Nodejs
  'app.json', // Ruby
  'composer.json', // PHP
  'app.yml',
  'app.yaml',
]

export default function getDeploymentFlowName (args) {
  if (args.flow) return args.flow

  const cwd = getCwd(args)

  // Otherwise find the name from package
  const packageName = getPackageName(args)
  if (packageName) return packageName

  // Otherwise use git name (if git repo)
  if (fs.existsSync(path.resolve(cwd, '.git'))) {
    const gitName = repoName.sync()
    if (gitName) return gitName
  }

  // Otherwise use lang + directory name
  const lang = getLanguage(args)
  const parentDir = path.basename(cwd)
  return lang ? `${lang.name}-${parentDir}` : parentDir
}

function getPackageName (args) {
  const cwd = getCwd(args)
  const fileNames = packageFiles
    .filter(fileName => fs.existsSync(path.resolve(cwd, fileName)))

  // Check each for a name
  return forEach(fileNames, (fileName) => {
    const ext = fileName.split('.').pop()
    const filePath = path.resolve(cwd, fileName)

    let file
    if (ext === 'json') file = fs.readJsonSync(filePath)
    else if (ext === 'yml' || ext === 'yaml') {
      file = yml.safeLoad(fs.readFileSync(filePath, 'utf8'))
    }

    if (file.name) return file.name

    return undefined
  })
}
