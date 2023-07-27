const express = require('express');
const app = express();

// configurations
const config = require('./utils/config');

require('express-async-errors');

// cors
const cors = require('cors');

// routers
const pingRouter = require('./controllers/ping');

app.use(cors()).use(express.json()).use('/api/ping', pingRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

module.exports = app;
