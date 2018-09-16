import fs from 'fs-extra'
import path from 'path'
import shajs from 'sha.js'
import request from '../helpers/request'
import handleError from '../helpers/errors'
import output from '../helpers/output'
import { getPaths, getCwd } from '../helpers/args/paths'
import { getFlowName } from '../helpers/args/flow'
import { getProjectName } from '../helpers/args/project'

export async function handler (args) {
  // Get a list of files and upload them
  const files = await getPaths(args)

  // No files
  if (files.length === 0) {
    handleError('No files found')
  }

  // Require a projectName
  const project = await getProjectName(args, true)

  console.log(project)

  // Upload each file and wait for them to complete
  const promises = files.map(async (file) => {
    output(`Uploading ${file}`, args)
    const stream = fs.createReadStream(file)
    return request(args, {
      url: '/files',
      method: 'POST',
      body: stream,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      qs: {
        project,
      },
      json: false,
    })
  })

  await Promise.all(promises)

  output.accent('Upload success', args)
  output.space(args)

  // Upload the deployment data
  const name = await getFlowName(args)
  output.accent(`Deploying flow: ${name}`, args)

  // Send deploy request
  const deployFilesPromises = files.map(async (file) => {
    const buffer = fs.readFileSync(file)
    const sha = shajs('sha256').update(buffer).digest('hex')
    return {
      // name: path.basename(file),
      sha,
      size: buffer.byteLength,
      path: path.relative(getCwd(args), file),
    }
  })

  const deployFiles = await Promise.all(deployFilesPromises)

  // Deploy!
  await request(args, {
    url: '/deploy',
    method: 'POST',
    body: {
      flow: name,
      files: deployFiles,
    },
    qs: {
      project,
    },
  })

  output.success('Deployment complete', args)

  output('View your deployment at:')
  output.accent('')
}

export default {
  command: 'deploy [dir]',
  desc: 'Deploy your flow',
  builder: (yargs) => {
    return yargs
      .positional('dir', {
        describe: 'directory to deploy',
        default: './',
      })
  },
  handler,
}
