import chalk from 'chalk'

function output (msg) {
  console.log(msg)
}

output.block = function outputBlock (msg) {
  output(['', msg, ''].join('\n'))
}

output.error = function outputError (msg, exit = true) {
  output(chalk.red(msg))
  if (exit) process.exit(1)
}

output.success = function outputSuccess (msg) {
  output(chalk.green(msg))
}

output.accent = function outputAccent (msg) {
  output(`${chalk.grey('>')} ${msg}`)
}

output.space = function outputSpace () {
  output('')
}

export default output
