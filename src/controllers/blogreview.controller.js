const { Blogreview } = require('../models/blogreview.model');

module.exports = {
	create: async (body) => {
		try {
			// create new user and save
			let blogreview = new Blogreview(body);
			await blogreview.save();
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	getAll: async () => {
		try {
			let blogreview = await Blogreview.find();
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
