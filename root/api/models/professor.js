const mongoose = require('mongoose');

const professorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	faculty: String,
	avgRating: Number,
	courses: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Course',
			},
		],
		default: [],
	},
	reviews: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ProfessorReview',
			},
		],
		default: [],
	},
});

professorSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Professor', professorSchema);
