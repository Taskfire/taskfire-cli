import cli from '../../src/cli'
import { checkOutput } from '../helpers/utils'

jest.mock('request-promise-native')

describe('cmds/projects.spec', () => {
  test('projects help command runs', async () => {
    const { exit, errors } = await checkOutput(() =>
      cli.parse(['projects', '-h']))

    expect(exit).toBe(true)
    expect(errors).toEqual([])
  })

  test('projects help command matches snapshot', async () => {
    const { logs } = await checkOutput(() =>
      cli.parse(['projects', '-h']))

    expect(logs).toMatchSnapshot()
  })

  // test.only('projects list command with no projects', async () => {
  //   taskfire.projects = {
  //     list: jest.fn().mockResolvedValue([]),
  //   }
  //
  //   const { exit, errors } = await checkOutput(() =>
  //     cli.parse(['projects', '--token', 't123', '--project', 'p123']))
  //
  //   //
  //   // expect(exit).toBe(true)
  //   // expect(errors).toEqual([])
  // })
})
