// utilises the .env file to set the environment variables
require('dotenv').config();

const PORT = process.env.PORT;

module.exports = { PORT };
