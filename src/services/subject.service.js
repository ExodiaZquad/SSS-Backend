const Joi = require('joi');
const _ = require('lodash');

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

const mergeData = (subjects, type) => {
	const sec = subjects.map((subject) => subject.sec);
	let merge = { ...subjects[0].toObject(), sec };
	merge = _.pick(
		merge,
		'_id',
		'id',
		'name',
		'sec',
		'credit',
		'type',
		'hasLab',
	);

	let timeBackup = [];
	for (let i = 0; i < subjects.length; i++) {
		const date = transformDate(subjects[i].class.start);
		const time = transformTime(
			subjects[i].class.start,
			subjects[i].class.end,
		);

		timeBackup.push(date + ' ' + time);
	}

	merge[type] = timeBackup;

	return merge;
};

const transformTime = (start, end) => {
	const dotToHyphen = (date) => {
		let time = date.substr(date.length - 8);
		time = time.substr(0, 5);
		time = time.replace(':', '.');
		return time;
	};

	return dotToHyphen(start) + ' - ' + dotToHyphen(end);
};

const transformDate = (date) => {
	const compareDate = {
		'March 1': 'Sunday',
		'March 2': 'Monday',
		'March 3': 'Tuesday',
		'March 4': 'Wednesday',
		'March 5': 'Thursday',
		'March 6': 'Friday',
		'March 7': 'Saturday',
	};

	const dateBeforeComma = date.substr(0, date.indexOf(','));
	return compareDate[dateBeforeComma];
};

exports.validate = validate;
exports.mergeData = mergeData;
