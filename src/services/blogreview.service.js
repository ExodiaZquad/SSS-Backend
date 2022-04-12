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

const validate_like_dislike = (body) => {
	const schema2 = Joi.object({
		target_id: Joi.string().required(),
	});

	return schema2.validate(body);
};

const validate_whoDelete_isSame_objectId = (body) => {
	const { error } = validate_like_dislike(body);
	if (error) return error;

	return true;
};
exports.validate_whoDelete_isSame_objectId = validate_whoDelete_isSame_objectId;
exports.validate_like_dislike = validate_like_dislike;
exports.validate = validate;
