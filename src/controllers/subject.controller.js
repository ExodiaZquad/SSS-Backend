const { Theory } = require('../models/theory.model');
const { Lab } = require('../models/Lab.model');
const { mergeData } = require('../services/subject.service');

module.exports = {
	findSubjectById: async (id) => {
		try {
			let subject = {};

			const theories = await Theory.find({ id });

			// sort Theories by sec
			theories.sort((a, b) => {
				let fa = a.sec;
				let fb = b.sec;

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			});

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
	findTheoriesByIdAndSec: async (subjects) => {
		try {
			const allId = subjects.map((subject) => subject.id);
			const theories = await Theory.find({ id: { $in: allId } });

			let filtered = [];

			// Filter Lab that sec match with Theory
			for (let i = 0; i < subjects.length; i++) {
				for (let j = 0; j < theories.length; j++) {
					if (theories[j].id == subjects[i].id) {
						if (subjects[i].sec == '-1') {
							filtered.push(theories[j]);
						} else {
							if (theories[j].sec == subjects[i].sec) {
								filtered.push(theories[j]);
							}
						}
					}
				}
			}

			return filtered;
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
	findLabsByIdAndSec: async (theories) => {
		try {
			const labs = await Lab.find();

			const filtered = [];

			// Filter Labs than sec in Theries
			for (let i = 0; i < labs.length; i++) {
				for (let j = 0; j < theories.length; j++) {
					if (labs[i].id == theories[j].id) {
						if (labs[i].sec.slice(-1) == theories[j].sec) {
							// console.log(labs[i].sec, theories[j].sec);
							filtered.push(labs[i]);
						}
					}
				}
			}

			return filtered;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
