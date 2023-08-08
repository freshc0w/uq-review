const express = require('express')
const app = express()

// configurations
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

require('express-async-errors')

// cors
const cors = require('cors')

// routers
const pingRouter = require('./controllers/ping')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// connecting to MONGODB
mongoose.set('strictQuery', false)
const url = config.MONGODB_URI
logger.info('connecting to', url)
mongoose
  .connect(url)
  .then(res => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    logger.info(`error connecting to MongoDB: ${err.message}`)
  })

// middleware
app
  .use(middleware.requestLogger)
  .use(morgan(middleware.reqMorganLogger))
  .use(middleware.userExtractor)

// controllers
app.use('/api/ping', pingRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
