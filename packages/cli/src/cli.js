#!/usr/bin/env node

import yargs from 'yargs'
import flows from './cmds/flows'
import projects from './cmds/projects'
import login from './cmds/login'
import runs from './cmds/runs'
import deploy from './cmds/deploy'
import config from './cmds/config'

yargs
  .usage('Usage: taskfire <command> [options]')
  .scriptName('taskfire')
  .command(flows)
  .command(projects)
  .command(runs)
  .command(deploy)
  .command(config)
  .command(login)
  .option('token', {
    alias: 't',
    describe: 'Authentication token',
  })
  .option('project', {
    alias: 'p',
    describe: 'Project to target',
  })
  .fail((msg, err) => {
    console.log('')
    console.log(msg || err.message)
    if (process.env.NODE_ENV !== 'production') {
      throw err
    }
    // process.exit(1)
  })
  .demandCommand()
  .recommendCommands()
  .help('h')
  .parse()
