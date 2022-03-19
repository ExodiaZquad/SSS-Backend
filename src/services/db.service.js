const mongoose = require('mongoose');
const config = require('../config');

// Connect to mongoDB
mongoose
	.connect(config.MONGO_URI)
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.error('Could not connect to MongoDB...'));
