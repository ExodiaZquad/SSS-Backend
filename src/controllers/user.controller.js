const { User } = require('../models/user.model');
const {
	validate,
	generateAuthToken,
	validateEmail,
} = require('../services/user.service');
const bcrypt = require('bcrypt');

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
			let { error } = validate(body);
			if (error) return null;

			// validate eamil
			const { email } = body;
			error = validateEmail(email);
			if (error) return null;

			// create new user
			let user = new User(body);

			// hash googleId and save
			const salt = await bcrypt.genSalt(10);
			user.googleId = await bcrypt.hash(user.googleId, salt);
			await user.save();

			// generate token and return it
			const token = generateAuthToken(user._id);
			return token;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
