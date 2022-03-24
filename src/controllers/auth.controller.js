const { User } = require('../models/user.model');
const { validate } = require('../services/user.service');
const { findUserbByGoogleId } = require('../services/auth.service');

module.exports = {
	auth: async (body) => {
		try {
			// validate body
			const { error } = validate(body);
			if (error) return null;

			// destructure body
			const { email, googleId } = body;

			// GET all users by email
			const users = await User.find({ email });

			// find user with googleID
			const token = findUserbByGoogleId(users, googleId);
			return token;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
