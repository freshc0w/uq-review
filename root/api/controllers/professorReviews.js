const professorReviewsRouter = require('express').Router();
const ProfessorReview = require('../models/professorReview');
const Professor = require('../models/professor');
const handleComments = require('../helper/handleReviewComments');

// Get all reviews from all professors
professorReviewsRouter.get('/', async (req, res) => {
	const professorReviews = await ProfessorReview.find({})
		.populate('user', {
			username: 1,
			name: 1,
		})
		.populate('professor', {
			name: 1,
			faculty: 1,
			avgRating: 1,
		})

	res.json(professorReviews);
});

// Get a specific review
professorReviewsRouter.get('/:id', async (req, res) => {
	const foundProfessorReview = await ProfessorReview.findById(req.params.id)
		.populate('user', {
			username: 1,
			name: 1,
		})
		.populate('professor', {
			name: 1,
			faculty: 1,
			avgRating: 1,
		})

	foundProfessorReview
		? res.json(foundProfessorReview)
		: res.status(404).json({ error: 'review not found' }).end();
});

// Create a review
professorReviewsRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = req.user; // from middleware
	console.log('user', user);

	const createdProfessorReview = new ProfessorReview({
		title: body.title,
		content: body.content,
		semester: body.semester,
		date: body.date, // Should be concurrent date when the review is created
		rating: body.rating,
		communicationRating: body.communicationRating,
		approachabilityRating: body.approachabilityRating,
		feedbackRating: body.feedbackRating,
		likes: body.likes,
		dislikes: body.dislikes,
		reports: body.reports,
		pros: body.pros,
		cons: body.cons,
		coursesTaken: body.coursesTaken,
		user: user.id,
		professor: body.professor, // Professor id
	});

	const savedProfessorReview = await createdProfessorReview.save();

	// Update the user's professorReviews
	user.professorReviews = user.professorReviews.concat(
		savedProfessorReview._id
	);
	await user.save();

	// Add the review to the professor's reviews array collection
	await Professor.findByIdAndUpdate(body.professor, {
		$push: { reviews: savedProfessorReview._id },
	});

	res.json(savedProfessorReview);
});

// Update a professor review
professorReviewsRouter.put('/:id', async (req, res) => {
	const body = req.body;

	// TODO: check if the user is the creator of the review
	const user = req.user;
	const foundProfessorReview = await ProfessorReview.findById(req.params.id);

	if (
		!user ||
		!user.id ||
		user.id.toString() !== foundProfessorReview.user.toString()
	)
		return res.status(400).json({
			error: 'Cannot update review that was not created by logged in user.',
		});

	const updatedProfessorReview = {
		title: body.title,
		content: body.content,
		semester: body.semester,
		date: body.date, // Should be concurrent date when the review is created
		rating: body.rating,
		communicationRating: body.communicationRating,
		approachabilityRating: body.approachabilityRating,
		feedbackRating: body.feedbackRating,
		likes: body.likes,
		dislikes: body.dislikes,
		reports: body.reports,
		pros: body.pros,
		cons: body.cons,
		coursesTaken: body.coursesTaken,
	};

	await ProfessorReview.findByIdAndUpdate(
		req.params.id,
		updatedProfessorReview,
		{ new: true }
	);

	res.json(updatedProfessorReview);
});

// Delete a professor review
professorReviewsRouter.delete('/:id', async (req, res) => {
	const review = await ProfessorReview.findById(req.params.id);
	const user = req.user;

	if (!review)
		return res
			.status(404)
			.json({ error: 'Review not found or already deleted' });

	// only allow deletion if the user is the creator of the review
	if (review.user.toString() === user.id.toString()) {
		await ProfessorReview.findByIdAndRemove(req.params.id);
		res.status(204).end();
	} else {
		return res.status(400).json({
			error: 'Cannot delete review that was not created by logged in user.',
		});
	}
});

// Dealing with comments
// GET all comments from a review
professorReviewsRouter.get('/:id/comments', async (req, res) => {
	await handleComments.getReviewComments(req, res, ProfessorReview);
});

// POST a comment to a review
professorReviewsRouter.post('/:id/comments', async (req, res) => {
	await handleComments.postReviewComment(req, res, ProfessorReview);
});

// UPDATE a comment to a review
professorReviewsRouter.put('/:id/comments/:commentId', async (req, res) => {
	await handleComments.updateReviewComment(req, res, ProfessorReview);
});

// DELETE a comment from a review
professorReviewsRouter.delete('/:id/comments/:commentId', async (req, res) => {
	await handleComments.deleteReviewComment(req, res, ProfessorReview);
});

module.exports = professorReviewsRouter;
