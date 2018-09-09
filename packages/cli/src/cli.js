#!/usr/bin/env node

import yargs from 'yargs'
import flows from './cmds/flows'
import projects from './cmds/projects'
import login from './cmds/login'
import runs from './cmds/runs'
import images from './cmds/images'
import deploy from './cmds/deploy'
import config from './cmds/config'
import init from './cmds/init'
import output from './helpers/output'

yargs
  .usage('Usage: taskfire <command> [options]')
  .scriptName('taskfire')
  .command(flows)
  .command(projects)
  .command(runs)
  .command(deploy)
  .command(images)
  .command(config)
  .command(login)
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
    output.space()
    if (msg || (err && err.message)) {
      output.accent(msg || (err && err.message))
      output.space()
    }
    yargs.showHelp()
  })
  .recommendCommands()
  .help('h')
  .parse()
