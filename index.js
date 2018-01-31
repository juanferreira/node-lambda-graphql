'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const express = require('express')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')

module.exports = (options, applyMiddleware) => {

  let app = express()

  if ( typeof applyMiddleware == 'function' )
    applyMiddleware(app);

  app.use(graphqlHTTP(options))

  let server = awsServerlessExpress.createServer(app)

  return {
    handler: (event, context) => {
      return awsServerlessExpress.proxy(server, event, context)
    },close: () => {
      server.close()
    }
  }
}
