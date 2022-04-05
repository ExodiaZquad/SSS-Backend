const Joi = require('joi');

const validate = (body) => {
	const schema = Joi.object({
		subjectId: Joi.string()
			.pattern(/^[0-9]+$/)
			.required(),
		textBlogreview: Joi.string(),
		userId_Blogreview: Joi.string().required(),

		userId_Like: Joi.array().items(Joi.string()),
		userId_Dislike: Joi.array().items(Joi.string()),

		rate: Joi.number().integer().min(0).max(5),
	});

	return schema.validate(body);
};
// const validate_like_dislike = (body) => {
// 	const schema = Joi.object({ _id: Joi.string(), userId: Joi.string() });

// 	return schema.validate(body);
// };

exports.validate = validate;
