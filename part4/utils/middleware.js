// error handling middle
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method)
    logger.info('Path: ', request.path)
    logger.info('Body: ', request.body)
    logger.info('---')
    next()
}

// getTokenFrom helper function

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
}
  next()
}

// find out the user holding a specific token and sets it to the request object
const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if(decodedToken) {
    request.user = decodedToken;
  }
  next()
}


const unknownEndpoint = (request, response) => {
response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' 
    })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({
         error: error.message 
        })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    }  
    //error in the case of a expired token:
    else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'from middleware.js: token expired'
      })
    }

    logger.error(error.message)
    next(error)
  }
  
  module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler,
   
  }