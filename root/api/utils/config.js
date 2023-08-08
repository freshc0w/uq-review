// utilises the .env file to set the environment variables
require('dotenv').config();

const PORT = process.env.PORT;

const getMongoUri = () => {
	switch (process.env.NODE_ENV) {
		case 'test':
			return process.env.TEST_MONGODB_URI;
		case 'development':
			return process.env.DEV_MONGODB_URI;
		default:
			return process.env.MONGODB_URI;
	}
};

const MONGODB_URI = getMongoUri();

module.exports = { PORT, MONGODB_URI };
