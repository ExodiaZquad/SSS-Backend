require('dotenv').config({ path: '../.env' });
const config = require('./config');
const express = require('express');
const app = express();

// load DB service
require('./services/db.service');

// load routes
require('./routes')(app);

app.listen(config.PORT, () =>
	console.log(`Listening on port ${config.PORT}...`),
);
