const { User } = require('../models/user.model');
const { validate, generateAuthToken } = require('../services/user.service');
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
			const { error } = validate(body);
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
	getProfileData: async (userId) => {
		try {
			const user = await User.findOne({ _id: userId.id });
			return user;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
