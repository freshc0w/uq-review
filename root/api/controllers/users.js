const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('courseReviews', {
		title: 1,
		content: 1,
		semester: 1,
		date: 1,
		rating: 1,
		likes: 1,
		dislikes: 1,
		reports: 1,
		pros: 1,
		cons: 1,
	});
	res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).populate('courseReviews', {
		title: 1,
		content: 1,
		semester: 1,
		date: 1,
		rating: 1,
		likes: 1,
		dislikes: 1,
		reports: 1,
		pros: 1,
		cons: 1,
	});
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

// Force update on a user
// TODO: update password
usersRouter.put('/:id', async (req, res) => {
	const body = req.body;
	const user = {
		username: body.username,
		email: body.email,
		name: body.name,
		courseReviews: body.courseReviews,
		professorReviews: body.professorReviews,
	};

	const updatedUser = await User.findByIdAndUpdate(req.params.id, user, {
		new: true,
	});

	res.json(updatedUser);
});

usersRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndRemove(id);
	return !user
		? res.status(404).json({ error: 'User to be deleted not found' })
		: res.status(204).end();
});

module.exports = usersRouter;
