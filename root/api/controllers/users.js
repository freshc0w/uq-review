const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	return !user ? res.status(404).end() : res.json(user);
});

// TODO: add validation
usersRouter.post('/', async (req, res) => {
	const { username, email, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		email,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	res.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndRemove(id);
	return !user
		? res.status(404).json({ error: 'User to be deleted not found' })
		: res.status(204).end();
});

module.exports = usersRouter;
