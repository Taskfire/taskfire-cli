#!/usr/bin/env node
import Raven from 'raven'
import cli from './cli'

if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
  Raven.config('https://c3fedd715c0c449096a1278564487215@sentry.io/1281652').install()
}

cli.parse()
