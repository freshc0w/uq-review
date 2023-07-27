const pingRouter = require('express').Router();

pingRouter.get('/', async (req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

module.exports = pingRouter;
