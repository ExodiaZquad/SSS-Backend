const { Theory } = require('../models/theory.model');
const { Lab } = require('../models/lab.model');
const { mergeData } = require('../services/subject.service');
const { isOverlap } = require('../services/schedule.service');

module.exports = {
	findSubjectById: async (id) => {
		try {
			let subject = {};

			const theories = await Theory.find({ id });
			if (!theories) return null;

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

			// Sort Lab
			labs.sort((a, b) => {
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
	findGened: async () => {
		try {
			const categories = ['901', '902', '903', '904', '905'];
			const theories = await Theory.find();
			let gened = [];
			for (let i = 0; i < theories.length; i++) {
				if (categories.includes(theories[i].category)) {
					gened.push(theories[i]);
				}
			}

			return gened;
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
	filterGened: async (generated, gened) => {
		try {
			let filteredGened = [];
			for (let i = 0; i < generated.length; i++) {
				let schedule = generated[i];
				for (let j = 0; j < gened.length; j++) {
					schedule.push(gened[j]);

					if (isOverlap(schedule)) {
						schedule.pop();
						continue;
					}

					filteredGened.push(gened[j]);
					schedule.pop();
				}
				break;
			}

			return filteredGened;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
	formatGened: (gened) => {
		const transform = [];
		const idBackup = [];
		for (let i = 0; i < gened.length; i++) {
			if (idBackup.includes(gened[i].id)) {
				// console.log(gened[i].name, gened[i].sec);
				for (let j = 0; j < transform.length; j++) {
					if (gened[i].id == transform[j].id) {
						transform[j].sec.push(gened[i].sec);
					}
				}
			} else {
				const temp = { ...gened[i].toObject() };
				const formatSec = [temp.sec];
				temp.sec = formatSec;

				transform.push(temp);
				idBackup.push(gened[i].id);
			}
		}

		for (let i = 0; i < transform.length; i++) {
			transform[i].sec.sort();
		}

		return transform;
	},
};
