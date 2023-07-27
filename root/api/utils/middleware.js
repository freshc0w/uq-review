const logger = require('./logger');
const jwt = require('jsonwebtoken');

// Middleware
const requestLogger = (req, res, next) => {
	logger.info('Method: ', req.method);
	logger.info('Path: ', req.path);
	logger.info('Body: ', req.body);
	logger.info('---');
	next();
};

// Morgan middleware custom fnc for POST
const reqMorganLogger = (tokens, req, res) =>
	[
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'),
		'-',
		tokens['response-time'](req, res),
		'ms',
		JSON.stringify(req.body),
	].join(' ');

const tokensExtractor = (req, res, next) => {
	// TODO: extract token from req
	next();
};

const userExtractor = (req, res, next) => {
	// TODO: extract user from req
	next();
};

const unknownEndpoint = (req, res, next) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		// Invalid params from mongoose validation schema
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' });
	}

	next(error);
};

module.exports = {
	requestLogger,
	reqMorganLogger,
	tokensExtractor,
	userExtractor,
	unknownEndpoint,
	errorHandler,
};
