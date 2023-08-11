const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required.'],
		trim: true,
		unique: [true, 'Username already exists'], // Must be unique
	},
	name: String,
	passwordHash: String,
	email: {
		type: String,
		required: [true, 'Email is required.'],
		unique: true,
	},
	courseReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'CourseReview',
		},
	],
	professorReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ProfessorReview',
		},
	],
});

// Must have unique username
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;

		// Don't store passwordHash to db.
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model('User', userSchema);
