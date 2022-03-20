const { Blogreview } = require('../models/blogreview.model');

module.exports = {
	create: async (body) => {
		try {
			// create new user and save
			blogreview = new Blogreview(body);
			await blogreview.save();

			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
