const express = require('express');
const app = express();

const cors = require('cors');

const pingRouter = require('./controllers/ping');

app.use(cors()).use(express.json()).use('/api/ping', pingRouter);

module.exports = app;
