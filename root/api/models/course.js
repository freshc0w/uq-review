const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
	code: String,
	title: String,
	url: String,
	faculty: String,
	professor: String,
	avgRating: Number,
  units: Number,
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CourseReview',
		},
	],
});

courseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Course', courseSchema);
