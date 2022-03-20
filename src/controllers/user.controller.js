const { User } = require('../models/user.model');
const { validate } = require('../services/user.service');

module.exports = {
	findOne: async (email) => {
		try {
			const user = await User.findOne({ email });
			return user;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	register: async (body) => {
		try {
			// validate body
			const { error } = validate(body);
			if (error) return error.details[0].message;

			// validate user
			let user = await User.findOne({ email: body.email });
			if (user) return 'User already Registered';

			// create new user and save
			user = new User(body);
			await user.save();

			return user;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
