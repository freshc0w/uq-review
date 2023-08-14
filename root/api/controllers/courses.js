const coursesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Course = require('../models/course');

coursesRouter.get('/', async (req, res) => {
	const courses = await Course.find({}).populate('reviews', {});
	res.json(courses);
});

coursesRouter.get('/:id', async (req, res) => {
	const course = await Course.findById(req.params.id).populate('reviews', {});
	if (course) {
		res.json(course);
	} else {
		res.status(404).end();
	}
});

coursesRouter.post('/', async (req, res) => {
	const body = req.body;

	// TODO: Logic of finding a professor id from the name.api
	const course = new Course({
		code: body.code,
		title: body.title,
		url: body.url,
		faculty: body.faculty,
		professor: body.professor, // TODO: Logic of finding a professor id from the name
		avgRating: body.avgRating,
		units: body.units,
	});

	const savedCourse = await course.save();
	res.json(savedCourse);
});

// Updating a course's general info.
coursesRouter.put('/:id', async (req, res) => {
	const body = req.body;

	const course = {
		code: body.code,
		title: body.title,
		url: body.url,
		faculty: body.faculty,
		professor: body.professor,
		avgRating: body.avgRating,
		units: body.units,
	};

	await Course.findByIdAndUpdate(req.params.id, course, { new: true });

	res.json(course);
});

coursesRouter.delete('/:id', async (req, res) => {
	await Course.findByIdAndRemove(req.params.id);
	res.status(204).end();
});

// Dealing with reviews.
coursesRouter.get('/:id/reviews', async (req, res) => {
	const course = await Course.findById(req.params.id).populate('reviews', {});

	course ? res.json(course.reviews) : res.status(404).end();
});

module.exports = coursesRouter;
