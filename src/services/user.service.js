const Joi = require('joi');

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
