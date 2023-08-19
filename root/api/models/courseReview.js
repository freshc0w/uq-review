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

const courseReviewSchema = new mongoose.Schema({
	title: String,
	content: String,
	semester: String,
	professor: String,
	date: Date,
	rating: Number,
	difficulty: Number,
	lectureQuality: Number,
	tutorialQuality: Number,
	workload: Number,
	// collation of user ids. We use the length of this array to calculate the likes/dislikes
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
	pros: [],
	cons: [],
	comments: [commentSchema],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});

courseReviewSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('CourseReview', courseReviewSchema);
