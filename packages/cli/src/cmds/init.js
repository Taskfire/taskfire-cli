import fs from 'fs-extra'
import path from 'path'
import inquirer from 'inquirer'
import autoCompletePrompt from 'inquirer-autocomplete-prompt'
import matchSorter from 'match-sorter'
import { glob } from 'glob-gitignore'
import getFlowName from '../helpers/args/flow'
import output from '../helpers/output'
import { getCwd } from '../helpers/args/paths'

// const GIT_URL = 'https://github.com/Taskfire/taskfire-cli/tree/v0.2.0/packages/cli/templates'

inquirer.registerPrompt('autocomplete', autoCompletePrompt)

async function handler (args) {
  const prompts = []
  const files = await fs.readdir(path.resolve(__dirname, '../../templates/'))

  // Remove non-exampole files
  let exampleList = files.filter(d => !d.startsWith('.'))

  // Move basic to the top of the list
  exampleList = ['basic', ...exampleList.filter(d => d !== 'basic')]
  // exampleList = [...exampleList, 'custom']

  if (!args.name) {
    prompts.push({
      type: 'input',
      name: 'name',
      message: 'name',
      default: await getFlowName(args),
    })
  }

  // if (!args.project) {
  //   prompts.push({
  //     type: 'input',
  //     name: 'project',
  //     message: 'project',
  //     default: await getProjectName(args),
  //   })
  // }

  if (!args.template) {
    prompts.push({
      type: 'autocomplete',
      name: 'template',
      message: 'Select a template below...',
      source: async (answersSoFar, input) => {
        return !input ? exampleList : matchSorter(exampleList, input)
      },
    })
  }

  const shouldPrompt = !(args.s || args.silent) && prompts.length > 0
  const answers = shouldPrompt ? await inquirer.prompt(prompts) : {}

  const name = args.name || answers.name
  const template = args.template || answers.template
  const project = args.project || args.p // || answers.p

  if (!exampleList.includes(template)) {
    output.error('Invalid flow template specified')
  }

  const dest = getCwd(args)

  // Check for existing directory
  if (fs.existsSync(dest) && !(args.force && args.f)) {
    const { overwrite } = await inquirer.prompt([{
      type: 'confirm',
      name: 'overwrite',
      message: 'Overwrite existing directory?',
    }])
    if (!overwrite) {
      output.error('Init cancelled!')
    }
  }

  output.accent(`Copying template to ${dest}`, args)

  const pkgDir = path.resolve(__dirname, `../../templates/${template}`)
  const filePaths = await glob(['**'], {
    cwd: pkgDir,
    nodir: true,
    // realpath: true,
  })

  filePaths.forEach((filePath) => {
    const buff = fs.readFileSync(path.resolve(pkgDir, filePath), 'utf-8')
    fs.outputFileSync(path.resolve(dest, filePath), buff)
  })

  // await fs.copy(path.resolve(__dirname, `../../templates/${template}`), dest)
  await fs.outputJson(path.resolve(dest, '.taskfirerc'), {
    default: {
      project,
      flow: name,
    },
  })

  if (name) output.success(`Flow ${name} created`, args)
  else output.success('Flow created')
}

export default {
  command: 'init [dir]',
  desc: 'Initialise a new flow',
  builder: (yargs) => {
    return yargs
      .positional('dir', {
        describe: 'directory to deploy',
        default: './',
      })
      .option('name', {
        describe: 'Name of the flow',
      })
      .option('template', {
        describe: 'Template to use for the flow',
      })
      .option('force', {
        alias: 'f',
        describe: 'Force init even if existing dir exists',
      })
  },
  handler,
}
