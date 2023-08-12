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
	const comment = body.comment;

	const review = await model.findById(req.params.id);

	if (!review) return res.status(404).end();

	const updatedReview = {
		...review._doc,
		comments: !review.comments
			? [{ comment, user: user.id, id: uuidv4() }]
			: [...review.comments, { comment, user: user.id, id: uuidv4() }],
	};

	await model.findByIdAndUpdate(req.params.id, updatedReview, {
		new: true,
	});

	res.json(updatedReview);
};

const updateReviewComment = async (req, res, model) => {
	const body = req.body;
	const comment = body.comment;
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
		comments: review.comments.map(c =>
			c.id === req.params.commentId
				? { ...c, comment, user: user.id }
				: { ...c }
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
