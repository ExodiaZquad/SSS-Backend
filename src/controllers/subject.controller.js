const { Theory } = require('../models/theory.model');
const { Lab } = require('../models/Lab.model');
const { mergeData } = require('../services/subject.service');

module.exports = {
	findSubjectById: async (id) => {
		try {
			let subject = {};
			// Theories
			const theories = await Theory.find({ id });
			if (theories.length)
				subject = { ...mergeData(theories, 'theoryTime') };

			// Labs
			const labs = await Lab.find({ id });
			if (labs.length) {
				const { sec, labTime } = mergeData(labs, 'labTime');
				subject.labSec = sec;
				subject.labTime = labTime;
			}

			return subject;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
	findTheoriesById: async (theoriesId) => {
		try {
			const theories = await Theory.find({ id: { $in: theoriesId } });
			return theories;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
	findLabs: async () => {
		try {
			const labs = await Lab.find();
			return labs;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
