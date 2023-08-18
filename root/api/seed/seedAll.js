const seedCourses = require('./courses');
const seedProfessors = require('./professors');

const seedAll = async () => {
  try {
    await seedCourses();
    await seedProfessors();
  } catch (err) {
    console.log(err);
  }
}

module.exports = seedAll;
