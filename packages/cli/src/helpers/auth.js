import chalk from 'chalk'
import handleError from './errors'
import { getAuthConfig } from './args/config'

const NO_TOKEN_MSG = `
  ${chalk.red('No authentication token')}

  Use ${chalk.cyanBright('$ taskfire login')} to login
  Or ${chalk.cyanBright('$ taskfire signup')} to create a new account
`

export default async function getAuth (args, requireAuth = true) {
  let token = args.t || args.token

  if (!token) {
    // TODO: Get token from the cache
    const auth = await getAuthConfig(args)
    if (auth) {
      // eslint-disable-next-line
      token = auth.credentials[auth.defaultAuth].token
    }
  }

  if (!token && requireAuth) {
    handleError(NO_TOKEN_MSG)
  }

  return token
}
