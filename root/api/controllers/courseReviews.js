const courseReviewsRouter = require('express').Router();
const CourseReview = require('../models/courseReview');
const Course = require('../models/course');
const handleComments = require('../helper/handleReviewComments');

// Get all reviews from all courses
courseReviewsRouter.get('/', async (req, res) => {
	const courseReviews = await CourseReview.find({})
		.populate('user', {
			username: 1,
			name: 1,
		})
		.populate('course', {
			code: 1,
			title: 1,
			professor: 1,
			url: 1,
			avgRating: 1,
		});

	res.json(courseReviews);
});

// Get a specific review
courseReviewsRouter.get('/:id', async (req, res) => {
	const foundCourseReview = await CourseReview.findById(req.params.id)
		.populate('user', {
			username: 1,
			name: 1,
		})
		.populate('course', {
			code: 1,
			title: 1,
			professor: 1,
			url: 1,
			avgRating: 1,
		});

	foundCourseReview
		? res.json(foundCourseReview)
		: res.status(404).json({ error: 'review not found' }).end();
});

// Create a review
courseReviewsRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = req.user; // from middleware
	console.log('user', user);

	const createdCourseReview = new CourseReview({
		title: body.title,
		content: body.content,
		semester: body.semester,
		professor: body.professor,
		date: body.date, // Should be concurrent date when the review is created
		rating: body.rating,
		difficulty: body.difficulty,
		lectureQuality: body.lectureQuality,
		tutorialQuality: body.tutorialQuality,
		workload: body.workload,
		likes: body.likes,
		dislikes: body.dislikes,
		pros: body.pros,
		cons: body.cons,
		user: user.id,
		course: body.course, // course id
	});

	const savedCourseReview = await createdCourseReview.save();

	// Append specified review to the user's courseReviews array collection
	user.courseReviews = user.courseReviews.concat(savedCourseReview._id);
	await user.save();

	// Append the review to the course's reviews array collection
	await Course.findByIdAndUpdate(createdCourseReview.course, {
		$push: { reviews: createdCourseReview._id },
	});

	res.json(savedCourseReview);
});

// Update a course review
courseReviewsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	// TODO: Check if the user is the creator of the review
	const user = req.user;

	const foundCourseReview = await CourseReview.findById(req.params.id);

	if (
		!user ||
		!user.id ||
		user.id.toString() !== foundCourseReview.user.toString()
	)
		return res.status(400).json({
			error: 'Cannot update review that was not created by logged in user.',
		});

	const updatedCourseReview = {
		title: body.title,
		content: body.content,
		semester: body.semester,
		professor: body.professor,
		date: body.date, // Should be concurrent date when the review is created
		rating: body.rating,
		difficulty: body.difficulty,
		lectureQuality: body.lectureQuality,
		tutorialQuality: body.tutorialQuality,
		workload: body.workload,
		likes: body.likes,
		dislikes: body.dislikes,
		pros: body.pros,
		cons: body.cons,
		user: body.user,
		course: body.course, // course id
	};

	await CourseReview.findByIdAndUpdate(req.params.id, updatedCourseReview, {
		new: true,
	});

	res.json(updatedCourseReview);
});

// Delete a course review
// User's reviews by default are deleted.
courseReviewsRouter.delete('/:id', async (req, res) => {
	const review = await CourseReview.findById(req.params.id);
	const user = req.user;

	if (!review)
		return res
			.status(404)
			.json({ error: 'Review not found or already deleted.' });

	// only allow deletion if the user is the creator of the review
	if (review.user.toString() === user.id.toString()) {
		await CourseReview.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} else {
		return res.status(400).json({
			error: 'Cannot delete review that was not created by logged in user.',
		});
	}
});

// Dealing with comments
// Get all comments from a specific review
courseReviewsRouter.get('/:id/comments', async (req, res) => {
	await handleComments.getReviewComments(req, res, CourseReview);
});

// Create a comment for a specific review
courseReviewsRouter.post('/:id/comments', async (req, res) => {
	await handleComments.postReviewComment(req, res, CourseReview);
});

// Update a comment for a specific review
courseReviewsRouter.put('/:id/comments/:commentId', async (req, res) => {
	await handleComments.updateReviewComment(req, res, CourseReview);
});

// Delete a comment for a specific review
courseReviewsRouter.delete('/:id/comments/:commentId', async (req, res) => {
	await handleComments.deleteReviewComment(req, res, CourseReview);
});

module.exports = courseReviewsRouter;
