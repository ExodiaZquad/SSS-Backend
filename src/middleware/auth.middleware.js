const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');
	console.log('token: ', token);
	if (!token)
		return res.status(401).send('Access denied. No token provided.');

	try {
		const decoded = jwt.verify(token, config.JWT_PRIVATE_KEY);
		console.log('decoded: ', decoded);
		req.userId = decoded;
		next();
	} catch (error) {
		res.status(400).send('Invalid Token');
	}
};
