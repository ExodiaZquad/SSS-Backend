const { Theory } = require('../models/theory.model');
const { Lab } = require('../models/Lab.model');

module.exports = {
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
