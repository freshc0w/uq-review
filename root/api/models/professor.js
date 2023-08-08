const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
	name: String,
	faculty: String,
	avgRating: Number,
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Course',
		},
	],
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProfessorReview',
		},
	],
});

professorSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Professor', professorSchema);
