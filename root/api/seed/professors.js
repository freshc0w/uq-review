const Professor = require('../models/professor');
const professors = [
  {
    name: 'John Smith',
    faculty: 'Science',
    avgRating: 4.0,
    courses: [],
    reviews: [],
  },
  {
    name: 'Sarah Johnson',
    faculty: 'Health and Behavioural Sciences',
    avgRating: 3.8,
    courses: [],
    reviews: [],
  },
  {
    name: 'David Smith',
    faculty: 'Business, Economics and Law',
    avgRating: 4.2,
    courses: [],
    reviews: [],
  },
  {
    name: 'Emily Brown',
    faculty: 'Business, Economics and Law',
    avgRating: 3.9,
    courses: [],
    reviews: [],
  },
  {
    name: 'Mark Lee',
    faculty: 'Engineering, Architecture and Information Technology',
    avgRating: 4.5,
    courses: [],
    reviews: [],
  },
  {
    name: 'Karen Lee',
    faculty: 'Science',
    avgRating: 3.7,
    courses: [],
    reviews: [],
  },
  {
    name: 'Michael Johnson',
    faculty: 'Business, Economics and Law',
    avgRating: 4.1,
    courses: [],
    reviews: [],
  },
];

const seedProfessors = async () => {
	try {
		await Professor.deleteMany({});
		await Professor.insertMany(professors);
		console.log('Professors seeded');
	} catch (err) {
		console.log('Error inserting professor dummy data', err.message);
	}
};

module.exports = seedProfessors;
