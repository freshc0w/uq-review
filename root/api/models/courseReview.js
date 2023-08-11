const mongoose = require('mongoose');

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
	likes: Number,
	dislikes: Number,
	reports: Number,
	pros: [],
	cons: [],
	comments: [],
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
