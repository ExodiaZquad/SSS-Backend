const config = require('../config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const generateAuthToken = (id) => {
	const token = jwt.sign({ id }, config.JWT_PRIVATE_KEY);
	// console.log('token: ', token);
	// const temp = jwt.verify(token, 'KEY');
	// console.log('temp: ', temp);
	return token;
};

const validate = (body) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		googleId: Joi.string().required(),
		img: Joi.string().required(),
	});

	return schema.validate(body);
};

exports.validate = validate;
exports.generateAuthToken = generateAuthToken;
