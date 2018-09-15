import Git from 'nodegit'
import fs from 'fs-extra'
import path from 'path'
import getDeploymentFlowName from '../src/helpers/deploy/get-name'

describe('get-name.spec', () => {
  let args

  beforeEach(async () => {
    args = {
      dir: './tests/fixtures/taskfire-json',
    }
    await fs.remove(path.resolve(process.cwd(), './tests/fixtures/git'))
  })

  test('should get deployment name from args', () => {
    args.flow = 'flow-name'
    const name = getDeploymentFlowName(args)
    expect(name).toBe('flow-name')
  })

  test('should get name from taskfire.json', () => {
    const name = getDeploymentFlowName(args)
    expect(name).toBe('taskfire-json-flow-name')
  })

  test('should get name from taskfire.yml', () => {
    args.dir = './tests/fixtures/taskfire-yml'
    const name = getDeploymentFlowName(args)
    expect(name).toBe('taskfire-yml-flow-name')
  })

  test('should get name from .taskfirerc', () => {
    args.dir = './tests/fixtures/taskfire-rc'
    const name = getDeploymentFlowName(args)
    expect(name).toBe('taskfire-rc-flow-name')
  })

  test('should use git repo name', async () => {
    args.dir = path.resolve(process.cwd(), './tests/fixtures/git')
    const repo = await Git.Repository.init(args.dir, 0)
    Git.Remote.setUrl(repo, 'origin', 'https://github.com/taskfire/taskfire-cli.git')
    const name = getDeploymentFlowName(args)
    expect(name).toBe('taskfire-cli')
  })

  test('should not error if git without remote-url', async () => {
    args.dir = path.resolve(process.cwd(), './tests/fixtures/git')
    await Git.Repository.init(args.dir, 0)
    expect(() => getDeploymentFlowName(args)).not.toThrow()
  })

  test('should get name for dir', () => {
    args.dir = './tests/fixtures/empty-dir'
    const name = getDeploymentFlowName(args)
    expect(name).toBe('empty-dir')
  })
})
