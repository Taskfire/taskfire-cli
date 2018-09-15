import fs from 'fs-extra'
import path from 'path'
import { getUploadPaths } from '../src/helpers/deploy/get-paths'

const getPath = (dir, name) => path.resolve(process.cwd(), dir, name)

const createFile = (dir, name, content = '') => fs.outputFile(getPath(dir, name), content)


describe('get-paths.spec', () => {
  let args

  beforeEach(async () => {
    const dir = './tests/fixtures/get-paths'
    args = {
      dir,
    }
    await fs.remove(path.resolve(process.cwd(), dir))
  })

  test('gets file from dir', async () => {
    await createFile(args.dir, 'b.js')
    const paths = await getUploadPaths(args)
    expect(paths).toEqual([
      getPath(args.dir, 'b.js'),
    ])
  })

  test('ignores node_modules by default', async () => {
    await createFile(args.dir, 'node_modules/a.js')
    await createFile(args.dir, 'b.js')
    const paths = await getUploadPaths(args)
    expect(paths).toEqual([
      getPath(args.dir, 'b.js'),
    ])
  })

  test('ignores files from .gitignore in root dir', async () => {
    await createFile(args.dir, 'a.js')
    await createFile(args.dir, 'b.js')
    await createFile(args.dir, '.gitignore', 'a.js')
    const paths = await getUploadPaths(args)
    expect(paths).toEqual([getPath(args.dir, 'b.js')])
  })

  test('ignores files from .gitignore in parent dir', async () => {
    await createFile(args.dir, '.gitignore', 'a.js')

    args.dir = `${args.dir}/child-dir`
    await createFile(args.dir, 'a.js')
    await createFile(args.dir, 'b.js')

    const paths = await getUploadPaths(args)
    expect(paths).toEqual([getPath(args.dir, 'b.js')])
  })

  test('ignores files from .dockerignore', async () => {
    await createFile(args.dir, 'a.js')
    await createFile(args.dir, 'b.js')
    await createFile(args.dir, '.dockerignore', 'a.js')
    const paths = await getUploadPaths(args)
    expect(paths).toEqual([getPath(args.dir, 'b.js')])
  })
})
