import cli from '../src/cli'
import { checkOutput } from './helpers/utils'

describe('cli.spec', () => {
  test('client help command runs and exits', async () => {
    const { exit, errors } = await checkOutput(() =>
      cli.parse(['-h']))

    expect(exit).toBe(true)
    expect(errors).toEqual([])
  })

  test('client help command matches snapshot', async () => {
    const { logs } = await checkOutput(() =>
      cli.parse(['-h']))

    expect(logs).toMatchSnapshot()
  })
})
