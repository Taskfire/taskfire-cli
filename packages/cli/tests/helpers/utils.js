export async function checkOutput (f, argv) {
  let exit = false
  const _exit = process.exit
  const _emit = process.emit
  const _env = process.env
  const _argv = process.argv
  const _error = console.error
  const _log = console.log
  const _warn = console.warn

  process.argv = argv || []

  const errors = []
  const logs = []
  const warnings = []

  console.error = (msg) => { errors.push(msg) }
  console.log = (msg) => { logs.push(msg) }
  console.warn = (msg) => { warnings.push(msg) }

  return new Promise((resolve, reject) => {
    process.exit = (exitCode) => {
      exit = exitCode
      resolve()
      // _exit.call(process, exitCode)
    }

    process.emit = function emit (ev, value) {
      if (ev === 'uncaughtException') {
        reset()
        reject(value)
        return true
      }

      // eslint-disable-next-line
      return _emit.apply(this, arguments)
    }

    f()
  }).then(() => {
    reset()

    return ({
      errors,
      logs,
      warnings,
      exit,
    })
  })

  function reset () {
    process.exit = _exit
    process.emit = _emit
    process.env = _env
    process.argv = _argv

    console.error = _error
    console.log = _log
    console.warn = _warn
  }
}
