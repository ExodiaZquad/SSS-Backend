const config = require('../config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const generateAuthToken = (id) => {
	const token = jwt.sign({ id }, config.JWT_PRIVATE_KEY);
	return token;
};

const validate = (body) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().required(),
		googleId: Joi.string().required(),
		imageUrl: Joi.string().required(),
	});

	return schema.validate(body);
};

const validateEmail = (email) => {
	if (email.substring(9, email.length).toLowerCase() !== 'kmitl.ac.th')
		return 'Not KMITL account.';

	return null;
};
const validate_like_dislike = (body) => {
	const schema2 = Joi.object({
		target_id: Joi.string().required(),
	});

	return schema2.validate(body);
};
exports.validate_like_dislike = validate_like_dislike;
exports.validate = validate;
exports.generateAuthToken = generateAuthToken;
exports.validateEmail = validateEmail;
