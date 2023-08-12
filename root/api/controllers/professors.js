const professorsRouter = require('express').Router();
// TODO: try deconstruct this
const Professor = require('../models/professor');
const Course = require('../models/course');

professorsRouter.get('/', async (req, res) => {
	const professors = await Professor.find({})
		.populate('reviews', {
			title: 1,
			content: 1,
			rating: 1,
			date: 1,
			semester: 1,
			likes: 1,
			dislikes: 1,
			reports: 1,
		});

	res.json(professors);
});

professorsRouter.get('/:id', async (req, res) => {
	const professor = await Professor.findById(req.params.id).populate(
		'reviews',
		{
			title: 1,
			content: 1,
			rating: 1,
			date: 1,
			semester: 1,
			likes: 1,
			dislikes: 1,
			reports: 1,
		}
	);
	professor ? res.json(professor) : res.status(404).end();
});

professorsRouter.post('/', async (req, res) => {
	const body = req.body;

	const professor = new Professor({
		name: body.name,
		faculty: body.faculty,
		avgRating: body.avgRating,

		// array of course ids
		courses: body.courses,

		// Reviews are not saved here. Only initialised
		// reviews: body.reviews,
	});

	// TODO: find course id by name of the course code given in the body.
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
		// TODO: reviews: body.reviews, (?) Should we allow this?
	};

	const updatedProfessor = await Professor.findByIdAndUpdate(req.params.id, professor, { new: true });

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
