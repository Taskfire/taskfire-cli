import path from 'path'

export const getCwd = (args) => {
  return path.resolve(process.cwd(), args.dir)
}
