import request from 'request-promise-native'
import getAuth from './auth'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/v1'
  : 'https://api.taskfire.io/v1'

export default async function requestRest (args, req, requireAuth = true) {
  const token = await getAuth(args, requireAuth)

  const reqObj = {
    baseUrl: BASE_URL,
    json: true,
    auth: token && {
      bearer: token,
    },
    ...req,
  }

  const resp = await request(reqObj)

  return resp.data
}
