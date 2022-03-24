const express = require('express');
const users = require('../routes/user.route');
const blogreviews = require('../routes/blogreview.route');
const auth = require('../routes/auth.route');


module.exports = (app) => {
	app.use(express.json());
	app.use('/api/users', users);
	app.use('/api/blogreviews', blogreviews);
	app.use('/api/auth', auth);
};
