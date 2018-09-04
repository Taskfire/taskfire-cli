import fs from 'fs-extra'
import findUp from 'find-up'
import { glob } from 'glob-gitignore'
import ignore from 'ignore'
import ignoreByDefault from 'ignore-by-default'
import { getCwd } from '../args'

// const ignoreFiles = ['.taskfireignore', '.dockerignore', '.gitignore']

export async function getUploadPaths (args) {
  const cwd = getCwd(args)

  // Find a .gitignore
  const gitIgnorePath = await findUp('.gitignore', {
    cwd,
  })

  const gitIgnore = gitIgnorePath && fs.readFileSync(gitIgnorePath).toString()

  return glob(['**'], {
    cwd,
    nodir: true,
    realpath: true,
    ignore: ignore()
      .add(gitIgnore).add(ignoreByDefault.directories),
  })
}
