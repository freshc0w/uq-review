const express = require('express');
require('express-async-errors');
const app = express();

// configurations
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const morgan = require('morgan');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

// cors
const cors = require('cors');

// routers
const pingRouter = require('./controllers/ping');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const coursesRouter = require('./controllers/courses');
const professorsRouter = require('./controllers/professors');
const courseReviewsRouter = require('./controllers/courseReviews');
const professorReviewsRouter = require('./controllers/professorReviews');

// seed data
const seedData = require('./seed/seedAll');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

// connecting to MONGODB
mongoose.set('strictQuery', false);
const url = config.MONGODB_URI;
logger.info('connecting to', url);
mongoose
	.connect(url)
	.then(res => {
		logger.info('connected to MongoDB');
	})
	.catch(err => {
		logger.info(`error connecting to MongoDB: ${err.message}`);
	});

// middleware
app
	.use(middleware.requestLogger)
	.use(morgan(middleware.reqMorganLogger))
	.use(middleware.tokensExtractor)
	.use(middleware.userExtractor);

// controllers
// TODO: middleware.userExtractor on review routers.
app
	.use('/api/ping', pingRouter)
	.use('/api/users', usersRouter)
	.use('/api/login', loginRouter)
	.use('/api/courses', coursesRouter)
	.use('/api/professors', professorsRouter)
	.use('/api/courseReviews', courseReviewsRouter)
	.use('/api/professorReviews', professorReviewsRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

// Seed courses if node_env is development
// if (process.env.NODE_ENV === 'development') {
// 	seedData();
// }

// error handling
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
