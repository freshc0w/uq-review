const { v4: uuidv4 } = require('uuid');
const getReviewComments = async (req, res, model) => {
	const review = await model.findById(req.params.id);

	review
		? res.status(200).json(review.comments)
		: res.status(404).json({ message: 'Review not found' });
};

const postReviewComment = async (req, res, model) => {
	const body = req.body;
	const user = req.user;
	const review = await model.findById(req.params.id);

	if (!review) return res.status(404).end();

	const { content, date, likes, dislikes, reports } = body;

	const updatedReview = {
		...review._doc,
		comments:
			!review.comments || review.comments.length === 0
				? [
						{
							content,
							date,
							likes,
							dislikes,
							reports,
							user: user.id,
							id: uuidv4(),
						},
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ]
				: [
						...review.comments,
						{
							content,
							date,
							likes,
							dislikes,
							reports,
							user: user.id,
							id: uuidv4(),
						},
				// eslint-disable-next-line no-mixed-spaces-and-tabs
				  ],
	};

	await model.findByIdAndUpdate(req.params.id, updatedReview, {
		new: true,
	});
};

const updateReviewComment = async (req, res, model) => {
	const body = req.body;
	const content = body.content;
	const user = req.user;

	const review = await model.findById(req.params.id);

	if (!review) return res.status(404).end();

	// Find the targeted comment and check if it is made by user. If not, return 401 unauthorized
	const targetedComment = review.comments.find(
		c => c.id === req.params.commentId && c.user === user.id
	);

	if (!targetedComment) return res.status(401).end();

	const updatedReview = {
		...review._doc,

		// Map through the comments and update the targeted comment with the new content
		comments: review.comments.map(c =>
			c.id === req.params.commentId ? { ...c, content } : { ...c }
		),
	};

	await model.findByIdAndUpdate(req.params.id, updatedReview, {
		new: true,
	});

	res.json(updatedReview);
};

const deleteReviewComment = async (req, res, model) => {
	const review = await model.findById(req.params.id);

	if (!review) return res.status(404).end();

	const user = req.user;

	// Find the targeted comment and check if it was created by the user. If not, return 401 unauthorized
	const targetedComment = review.comments.find(
		c => c.id === req.params.commentId && c.user === user.id
	);

	if (!targetedComment) return res.status(401).end();

	const updatedReview = {
		...review._doc,
		comments: review.comments.filter(c => c.id !== req.params.commentId),
	};

	await model.findByIdAndUpdate(req.params.id, updatedReview, {
		new: true,
	});

	res.json(updatedReview);
};
module.exports = {
	getReviewComments,
	postReviewComment,
	updateReviewComment,
	deleteReviewComment,
};
