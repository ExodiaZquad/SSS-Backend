const { User } = require('../models/user.model');
const { Blogreview } = require('../models/blogreview.model');
const { Theory } = require('../models/theory.model');
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
			if (user.length == 0) return {};
			let temp_user = {
				name: user.name,
				email: user.email,
				imageUrl: user.imageUrl,
			};

			const getData_userBlogreview = async () => {
				const studentId = user.email.split('@')[0]; //bad approach!

				//map all theory subject in database
				const map_theories = new Map();
				let theories = await Theory.find();
				for (let i = 0; i < theories.length; i++) {
					map_theories.set(theories[i].id, theories[i].name);
				}

				// query specified user's reviews
				const blogreview = await Blogreview.find({
					userId_Blogreview: user._id,
				});
				if (blogreview.length == 0) return [];
				//change data in object blogreview before send
				let backup = [];
				for (let i = 0; i < blogreview.length; i++) {
					let temp = {
						...blogreview[i].toObject(),
						subjectName: map_theories.get(blogreview[i].subjectId),
						userId_Blogreview: studentId,
						userName_Blogreview: user.name,
						imageUrl: user.imageUrl,
					};
					backup.push(temp);
				}
				return backup;
			};

			//return with user's reviews post(s) and favourite schedule(s)
			const ret = {
				userProfile: temp_user,
				blogReviews: await getData_userBlogreview(),
				favSchedule: user.favSchedule,
			};

			return res.send(ret).status(200);
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
	},
	getUserData: async (req, res) => {
		try {
			// find user by _id given by auth services
			const user = await User.findOne({ _id: req.userId.id });

			const ret = {
				name: user.name,
				imgUrl: user.imageUrl,
			};

			return res.send(ret).status(200);
		} catch (error) {
			console.log(error);
			return res.status(400);
		}
	},
};
