const Course = require('../models/course');
const fs = require('fs');

const readFile = file => {
	try {
		const data = fs.readFileSync(file, 'utf8');
		const parsedData = JSON.parse(data);
		return parsedData;
	} catch (err) {
		console.log(err);
	}
};

const seedCourses = async () => {
	try {
		const courses = readFile('./seed/courses.json');
		console.log(courses);
		await Course.deleteMany({});
		await Course.insertMany(courses);
		console.log('Courses seeded successfully');
	} catch (err) {
		console.log('Error inserting courses:', err.message);
	}
};

module.exports = seedCourses;
