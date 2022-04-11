const Joi = require('joi');

const validate = (body) => {
	const schema = Joi.object({
		id: Joi.string().required(),
		name: Joi.string().required(),
		category: Joi.string().required(),
		sec: Joi.string().required(),
		credit: Joi.number().required(),
		day: Joi.number(),
		note: Joi.string(),
		teachers: Joi.array().required(),
		class: Joi.object().required(),
		midterm: Joi.object().required(),
		final: Joi.object().required(),
		type: Joi.string().required(),
		hasLab: Joi.boolean(),
	});

	return schema.validate(body);
};

exports.validate = validate;
