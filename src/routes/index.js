const express = require('express');

const users = require('../routes/user.route');
const blogreviews = require('../routes/blogreview.route');

module.exports = (app) => {
	app.use(express.json());
	app.use('/api/users', users);
	app.use('/api/blogreviews', blogreviews);
};
