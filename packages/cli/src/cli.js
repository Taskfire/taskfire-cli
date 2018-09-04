#!/usr/bin/env node

import yargs from 'yargs'
// import chalk from 'chalk'
import flows from './cmds/flows'
import login from './cmds/login'
import runs from './cmds/runs'
import deploy from './cmds/deploy'

yargs
  .usage('Usage: taskfire <command> [options]')
  .scriptName('taskfire')
  .command(flows)
  .command(runs)
  .command(deploy)
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
