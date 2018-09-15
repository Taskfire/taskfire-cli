import yargs from 'yargs'
import { handler } from '../list'
import output from '../../../helpers/output'
import request from '../../../helpers/request'
import createTable from '../../../helpers/table'

jest.mock('../../../helpers/request')
jest.mock('../../../helpers/output')
jest.mock('../../../helpers/table')

describe('cmds/projects.spec', () => {
  beforeEach(() => {
    output.block.mockReset()
  })

  test('projects list with no projects', async () => {
    request.mockResolvedValue([])

    const args = yargs.parse(['projects', '--token', 'x123'])

    await handler(args)

    expect(createTable).toHaveBeenCalledTimes(1)
    expect(output.block).toHaveBeenCalledTimes(1)
  })
})
