// the environment variables defined in the .env file taken into use with the expression below
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

// create HTTP server
const server = http.createServer(app)

// Prints a log once the server starts listening
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})