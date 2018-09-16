import { GraphQLClient } from 'graphql-request'
import getAuth from './auth'

const URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/graphql'
  : 'https://api.taskfire.io/graphql'

export default async function graphqlRequest (args, query, variables, requireAuth = true) {
  const token = await getAuth(args, requireAuth)
  const headers = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const client = new GraphQLClient(URL, { headers })
  return client.request(query, variables)
}
