# Dockbot Cli

[![Build Status](https://travis-ci.org/Taskbird/taskbird-node.svg?branch=master)](https://travis-ci.org/Taskbird/taskbird-node) [![Coverage Status](https://coveralls.io/repos/github/Taskbird/taskbird-node/badge.svg?branch=master)](https://coveralls.io/github/Taskbird/taskbird-node?branch=master)

A command line client for Dockbot.

Install with:

```
npm install dockbot-cli --global
```


## API

### Global Flags

`--token` - override the default token/authentication methods
`--project` - ID of the project


### Commands

#### login 

Authenticate the client, you can also choose a default project to authenticate against.

`--token=<project_token_from_console>`

If the token flag is not provided, you will be asked for the login details.


#### create

Creates a new flow template.

`--template=nodejs|ruby|docker` -


#### run

Runs the code in specified directory, without creating a flow. 


#### flows

A list of flows for the project

