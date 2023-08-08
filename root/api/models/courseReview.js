const mongoose = require('mongoose');

const courseReviewSchema = new mongoose.Schema({
	title: String,
	content: String,
	semester: String,
  date: String,
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
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course',
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