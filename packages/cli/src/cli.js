#!/usr/bin/env node

import yargs from 'yargs'
import flows from './cmds/flows'
import projects from './cmds/projects'
import login from './cmds/login'
import signup from './cmds/signup'
import runs from './cmds/runs'
import run from './cmds/run'
import logs from './cmds/logs'
import images from './cmds/images'
import variables from './cmds/variables'
import deploy from './cmds/deploy'
import config from './cmds/config'
import init from './cmds/init'
import output from './helpers/output'

const cli = yargs
  .usage('Usage: taskfire <command> [options]')
  .scriptName('taskfire')
  .command(flows)
  .command(projects)
  .command(runs)
  .command(run)
  .command(logs)
  .command(deploy)
  .command(images)
  .command(variables)
  .command(config)
  .command(login)
  .command(signup)
  .command(init)
  .option('token', {
    alias: 't',
    describe: 'Authentication token',
  })
  .option('project', {
    alias: 'p',
    describe: 'Project to target',
  })
  .option('silent', {
    alias: 's',
    describe: 'Silent mode (no stdout)',
  })
  .strict()
  .demandCommand(1)
  .fail((msg, err) => {
    console.log(err)
    output.space()
    if (msg || (err && err.message)) {
      output.accent(msg || (err && err.message))
      output.space()
    }
    yargs.showHelp()
  })
  .recommendCommands()
  .help('h')
  // .help('help')
  // .parse()

export default cli
