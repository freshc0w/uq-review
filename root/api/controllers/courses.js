const coursesRouter = require('express').Router();
const Course = require('../models/course');

coursesRouter.get('/', async (req, res) => {
	const courses = await Course.find({});
	res.json(courses.map(course => course.toJSON()));
	res.json(courses);
});

coursesRouter.get('/:id', async (req, res) => {
	const course = await Course.findById(req.params.id);
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
		reviews: body.reviews,
	});

	const savedCourse = await course.save();
	res.json(savedCourse);
});

coursesRouter.put('/:id', async (req, res) => {
  
})

module.exports = coursesRouter;
