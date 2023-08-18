const Course = require('../models/course');
const courses = [
  {
    code: 'MATH1051',
    title: 'Calculus & Linear Algebra I',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=MATH1051',
    faculty: 'Science',
    professor: 'John Smith',
    avgRating: 4.0,
    units: 2,
  },
  {
    code: 'PSYC1020',
    title: 'Introduction to Psychology: Developmental, Social and Clinical Psychology',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=PSYC1020',
    faculty: 'Health and Behavioural Sciences',
    professor: 'Sarah Johnson',
    avgRating: 3.8,
    units: 2,
  },
  {
    code: 'MGTS1301',
    title: 'Introduction to Management',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=MGTS1301',
    faculty: 'Business, Economics and Law',
    professor: 'David Smith',
    avgRating: 4.2,
    units: 2,
  },
  {
    code: 'LAWS1111',
    title: 'Foundations of Law',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=LAWS1111',
    faculty: 'Business, Economics and Law',
    professor: 'Emily Brown',
    avgRating: 3.9,
    units: 2,
  },
  {
    code: 'ENGG1200',
    title: 'Engineering Modelling & Problem Solving',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=ENGG1200',
    faculty: 'Engineering, Architecture and Information Technology',
    professor: 'Mark Lee',
    avgRating: 4.5,
    units: 2,
  },
  {
    code: 'CHEM1100',
    title: 'Chemistry 1',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=CHEM1100',
    faculty: 'Science',
    professor: 'Karen Lee',
    avgRating: 3.7,
    units: 2,
  },
  {
    code: 'ECON1010',
    title: 'Introduction to Economics: Principles and Applications',
    url: 'https://my.uq.edu.au/programs-courses/course.html?course_code=ECON1010',
    faculty: 'Business, Economics and Law',
    professor: 'Michael Johnson',
    avgRating: 4.1,
    units: 2,
  },
];

const seedCourses = async () => {
	try {
		await Course.deleteMany({});
		await Course.insertMany(courses);
    console.log('Courses seeded successfully');
	} catch (err) {
		console.log('Error inserting courses:', err.message);
	}
};

module.exports = seedCourses;
