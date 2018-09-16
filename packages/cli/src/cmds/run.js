import request from '../helpers/graphql'
import output from '../helpers/output'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://console.taskfire.io'

const RunFlowMutation = `
  mutation RunFlowMutation ($flowId: ID!) {
    run: runFlow (flowId: $flowId) {
      id
      project {
        id
        name
      }
    }
  }
`

const RunQuery = `
  query RunQuery ($runId: ID!) {
    run (runId: $runId) {
      id
      status
      log
    }
  }
`

export async function handler (args) {
  const { run } = await request(args, RunFlowMutation, {
    flowId: args.flowId,
  })

  const url = `${BASE_URL}/s/${run.project.name}/runs/${run.id}`

  output.space()
  output.success('Flow is now running')
  output.space()
  output.accent(`Run ID: ${run.id}`)
  output.space()
  output.accent(`Run URL: ${url}`)
  output.space()
  output.header('Run Log')
  output.space()

  getLogsUntilComplete(args, run.id)
}

async function getLogsUntilComplete (args, runId, prevLogLen = 0) {
  setTimeout(async () => {
    const { run } = await request(args, RunQuery, {
      runId,
    })

    // Only print new log lines
    if (run.log) {
      run.log.slice(prevLogLen).forEach((logLine) => {
        output(logLine)
      })
    }

    if (run.status === 'ACTIVE') {
      getLogsUntilComplete(args, runId, run.log.length)
    }
  }, 1000)
}

export default {
  command: 'run <flowId>',
  desc: 'Run a flow',
  handler,
  builder: (yargs) => {
    return yargs
      .positional('project/flow', {
        describe: 'ID for the flow to run',
      })
  },
}
