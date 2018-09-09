import chalk from 'chalk'

function output (msg, args = {}) {
  if (args.s || args.silent) return
  console.log(msg)
}

output.block = function outputBlock (msg, args) {
  output(['', msg, ''].join('\n'), args)
}

output.error = function outputError (msg, exit = true) {
  output(chalk.red(msg))
  if (exit) process.exit(1)
}

output.success = function outputSuccess (msg, args) {
  output(chalk.green(msg), args)
}

output.accent = function outputAccent (msg, args) {
  output(`${chalk.grey('>')} ${msg}`, args)
}

output.space = function outputSpace (args) {
  output('', args)
}

export default output
