const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: String,
	date: Date,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	reports: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

commentSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const professorReviewSchema = new mongoose.Schema({
	title: String,
	content: String,
	semester: String,
	date: String,
	rating: Number,
	communicationRating: Number,
	approachabilityRating: Number,
	feedbackRating: Number,
	likes: [],
	dislikes: [],
	reports: [],
	pros: [],
	cons: [],
	comments: [commentSchema],
	coursesTaken: String,
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
