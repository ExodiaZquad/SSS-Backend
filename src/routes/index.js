const express = require('express');
const users = require('../routes/user.route');

module.exports = (app) => {
	app.use(express.json());
	app.use('/api/users', users);
};
