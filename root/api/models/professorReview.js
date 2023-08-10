const mongoose = require('mongoose');

const professorReviewSchema = new mongoose.Schema({
	title: String,
	content: String,
	semester: String,
	date: String,
	rating: Number,
	communicationRating: Number,
	approachabilityRating: Number,
	feedbackRating: Number,
	likes: Number,
	dislikes: Number,
	reports: Number,
	pros: [],
	cons: [],
	coursesTaken: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	professor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Professor',
	},
});

professorReviewSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('ProfessorReview', professorReviewSchema);
