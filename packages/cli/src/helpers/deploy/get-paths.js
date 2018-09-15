import fs from 'fs-extra'
import findUp from 'find-up'
import { glob } from 'glob-gitignore'
import ignore from 'ignore'
import ignoreByDefault from 'ignore-by-default'
import { getCwd } from '../args'

const ignoreFiles = ['.dockerignore', '.gitignore']

export async function getUploadPaths (args) {
  const cwd = getCwd(args)

  // Find a .gitignore/.dockerignore
  const ignoresPromises = ignoreFiles.map(async (name) => {
    const ignorePath = await findUp(name, {
      cwd,
    })
    return (ignorePath && fs.readFileSync(ignorePath).toString()) || ''
  })

  const ignores = await Promise.all(ignoresPromises)

  return glob(['**'], {
    cwd,
    nodir: true,
    realpath: true,
    ignore: ignore()
      .add(ignores.join('\n'))
      .add(ignoreByDefault.directories),
  })
}
