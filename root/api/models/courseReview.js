const mongoose = require('mongoose');

const courseReviewSchema = new mongoose.Schema({
	title: String,
	author: String,
	content: String,
	semester: String,
	rating: Number,
	difficulty: Number,
	lectureQuality: Number,
	tutorialQuality: Number,
	workload: Number,
	likes: Number,
	dislikes: Number,
	reports: Number,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseReview'
    }
  ],
});

courseReviewSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('CourseReview', courseReviewSchema);
