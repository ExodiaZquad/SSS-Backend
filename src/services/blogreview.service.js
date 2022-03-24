const Joi = require('joi');

const validate = (body) => {
	const schema = Joi.object({
		subjectId: Joi.string()
			.pattern(/^[0-9]+$/)
			.required(),
		subjectName: Joi.string().required(),
		textBlogreview: Joi.string(),
		userId_Blogreview: Joi.string()
			.pattern(/^[0-9]+$/)
			.required(),
		userName_Blogreview: Joi.string().required(),

		userId_Like: Joi.array().items(Joi.string().pattern(/^[0-9]+$/)),
		userId_Dislike: Joi.array().items(Joi.string().pattern(/^[0-9]+$/)),

		typeOfsubject: Joi.string().required(),
	});

	return schema.validate(body);
};
// const validate_like_dislike = (body) => {
// 	const schema = Joi.object({ _id: Joi.string(), userId: Joi.string() });

// 	return schema.validate(body);
// };

exports.validate = validate;
