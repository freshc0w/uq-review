const professorsRouter = require('express').Router();
// TODO: try deconstruct this
const Professor = require('../models/professor');
const Course = require('../models/course');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const logger = require('../utils/logger');

professorsRouter.get('/', async (req, res) => {
	const professors = await Professor.find({});

	res.json(professors);
});

professorsRouter.get('/:id', async (req, res) => {
	const professor = await Professor.findById(req.params.id);
	professor ? res.json(professor) : res.status(404).end();
});

professorsRouter.post('/', async (req, res) => {
	const body = req.body;

	// from middleware userExtractor
	const user = req.user;

	const professor = new Professor({
		name: body.name,
		faculty: body.faculty,
		avgRating: body.avgRating,

		// array of course ids
		courses: body.courses,

		// Reviews are not saved here. Only initialised
		// reviews: body.reviews,
	});

	const professorSaved = await professor.save();
	professor.courses.forEach(async course => {
		const courseFound = await Course.findById(course);
		courseFound.professor = courseFound.professor.concat(professorSaved._id);
		await courseFound.save();
	});

	res.json(professorSaved);
});

professorsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const professor = {
		name: body.name,
		faculty: body.faculty,
		avgRating: body.avgRating,
		courses: body.courses,
	};

	await Professor.findByIdAndUpdate(req.params.id, professor, { new: true });

	res.json(updatedProfessor);
});

professorsRouter.delete('/:id', async (req, res) => {
	const professor = await Professor.findById(req.params.id);

	if (professor) {
		await Professor.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} else {
		res.status(404).json({ error: 'Professor not found' });
	}
});

module.exports = professorsRouter;