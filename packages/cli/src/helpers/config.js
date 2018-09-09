import { homedir } from 'os'
import fs from 'fs-extra'
import path from 'path'
import loadJsonFile from 'load-json-file'
import writeJsonFile from 'write-json-file'
import get from 'lodash/get'
import set from 'lodash/set'

const dirName = process.env.NODE_ENV === 'development'
  ? '.taskfire.dev'
  : '.taskfire'

const defaultAuth = {
  _: 'This is your Taskfire credentials file. DON\'T SHARE!',
  credentials: {},
}

const getAuthConfigPath = args =>
  path.resolve(getConfigPath(args), './auth.json')

const getBasicConfigPath = args =>
  path.resolve(getConfigPath(args), './config.json')

export default function getConfigPath (args) {
  const { configPath } = args
  if (configPath) {
    return path.resolve(configPath)
  }
  return path.resolve(homedir(), `./${dirName}'`)
}

export async function getAuthConfig (args) {
  const authPath = getAuthConfigPath(args)
  return fs.existsSync(authPath)
    ? loadJsonFile(authPath)
    : null
}

export async function addAuthConfig (args, username, token) {
  const authPath = getAuthConfigPath(args)

  let auth = await getAuthConfig(args)

  if (!auth) {
    auth = defaultAuth
  }

  // Update the auth config
  auth.credentials[username] = {
    type: 'jwt',
    token,
  }
  auth.defaultAuth = username

  await setBasicConfig('defaultProject', null)

  // Save the file
  return writeJsonFile(authPath, auth)
}

export async function setBasicConfig (args, key, value) {
  const configPath = getBasicConfigPath(args)
  let json = {}
  if (fs.existsSync(configPath)) {
    json = await fs.readJson(configPath)
  }
  set(json, key, value)
  await fs.outputJson(configPath, json, {
    spaces: 2,
  })
  return value
}

export async function getBasicConfig (args, key) {
  const configPath = getBasicConfigPath(args)
  if (!fs.existsSync(configPath)) return null
  const json = await fs.readJson(configPath)
  return get(json, key)
}

export async function getProjectName (args) {
  return args.p || args.project || getBasicConfig(args, 'defaultProject')
}
