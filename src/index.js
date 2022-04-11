require('dotenv').config({ path: '../.env' });
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

// setup cors
app.use(
	cors({
		origin: ['http://localhost:3000'],
	}),
);

// dependency for logging messages
app.use(morgan('dev'));

// load DB service
require('./services/db.service');

// load routes
require('./routes')(app);

app.listen(config.PORT, () =>
	console.log(`Listening on port ${config.PORT}...`),
);
