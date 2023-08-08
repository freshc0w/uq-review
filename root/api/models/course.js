const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const courseSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
	},
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

courseSchema.plugin(uniqueValidator);

courseSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Course', courseSchema);
