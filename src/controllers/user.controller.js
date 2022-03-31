const { User } = require('../models/user.model');
const { Blogreview } = require('../models/blogreview.model');
const { validate, generateAuthToken } = require('../services/user.service');
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
	getProfileData: async (req, res) => {
		try {
			// find user by the _id given by the decoded token (auth)
			const user = await User.findOne({ _id: req.userId.id });
			const studentId = user.email.slice(0, 8); //bad approach!

			// query specified user's reviews
			const reviews = await Blogreview.find({
				userId_Blogreview: studentId,
			});

			//return with user's reviews post(s) and favourite schedule(s)
			const ret = {
				blogReviews: reviews,
				favSchedule: user.favSchedule,
			};

			return res.send(ret).status(200);
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
	},
};
