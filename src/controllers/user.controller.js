const { User } = require('../models/user.model');
const { Blogreview } = require('../models/blogreview.model');
const { Theory } = require('../models/theory.model');
const mongoose = require('mongoose');
const _ = require('lodash');
const { generateImageUser } = require('../services/userImage.service.js');
const {
	validate,
	generateAuthToken,
	validateEmail,
	validate_like_dislike,
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

			let temp = {
				...body,
				imageUrl: generateImageUser(),
			};

			// create new user
			let user = new User(temp);

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

	like_Schedule: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userId.id });
			let new_fav = req.body.new_fav;
			let temp_new_fav = req.body.new_fav;
			let old_fav = user.favSchedule;
			// console.log(user);

			// console.log(_.orderBy(new_fav[0], ['id']));
			// console.log(_.orderBy(new_fav[0]));
			// console.log(user.favSchedule[0].sort());
			new_fav = _.orderBy(new_fav, ['id']);

			// console.log(_.orderBy(new_fav[0], ['id']));
			// console.log(_.orderBy(old_fav[0], ['id']));
			// console.log(_.isEqual(_.sortBy(new_fav[0]), _.sortBy(old_fav[0])));
			// console.log(old_fav);
			// console.log(old_fav.length);
			for (let k = 0; k < old_fav.length; k++) {
				// console.log('DOG');
				if (old_fav[k].array.length == new_fav.length) {
					let oldlist = _.orderBy(old_fav[k].array, ['id']);
					// console.log('OLD');
					// console.log(oldlist);
					// console.log(_.isEqual(new_fav, oldlist));

					if (_.isEqual(new_fav, oldlist)) {
						return res.status(400).send('isSame');
					}
				}
			}
			// 	old_fav.push(new_fav[i]);
			// }
			// console.log(user.favSchedule);
			// old_fav.push(new_fav);
			let temp = {
				_id: new mongoose.Types.ObjectId(),
				array: temp_new_fav,
			};
			// console.log(temp);
			user.favSchedule.push(temp);
			await user.save();
			return res.status(200).send('new_fav');
		} catch (error) {
			console.log(error);
			return res.status(400).send();
		}
	},

	unlike_Schedule: async (req, res) => {
		try {
			//validate target_id
			const { error } = validate_like_dislike(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			let target_id = req.body.target_id;

			// console.log(target_id);
			const user = await User.findOne({ _id: req.userId.id });
			let list_fav = user.favSchedule;
			// console.log(list_fav);
			for (let i = 0; i < list_fav.length; i++) {
				// console.log(target_id);
				// console.log(list_fav[i]._id.toString());
				if (target_id == list_fav[i]._id.toString()) {
					list_fav.pull(list_fav[i]);
					await user.save();
					return res.status(200).send('Unliked fav');
				}
			}
			await user.save();
			return res.status(400).send('NOT FOUND ID FAV');
		} catch (error) {
			console.log(error);
			return res.status(400).send(error);
		}
	},
};
