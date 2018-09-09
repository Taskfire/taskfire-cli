import chalk from 'chalk'
import prompt from 'prompt'
import { promisify } from 'promise-callbacks'
import createClient from '../helpers/client'
import output from '../helpers/output'
import { addAuthConfig } from '../helpers/config'

const promptGet = promisify.method(prompt, 'get')

const schema = {
  properties: {
    username: {
      description: 'Username',
      // pattern: /^[0-9a-zA-Z@.\-]+$/,
      // message: 'Username should be your e-mail address',
      required: true,
    },
    password: {
      description: 'Password',
      hidden: true,
    },
  },
}

async function handler (args) {
  const client = await createClient(args, false)

  // Get the login details
  prompt.start()

  const { username, password } = await promptGet(schema)

  const login = await client.request({
    method: 'POST',
    url: '/login',
    body: {
      email: username,
      password,
    },
  }).catch(() => {
    throw new Error(chalk.red('Invalid credentials'))
  })

  if (login) {
    await addAuthConfig(args, username, login.token)
  }

  output(chalk.green('Successful login'), args)
}

export default {
  command: 'login',
  desc: 'Login to Taskfire',
  builder: {
    dir: {
      default: '.',
    },
  },
  handler,
}
