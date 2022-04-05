const { Blogreview } = require('../models/blogreview.model');
const { validate } = require('../services/blogreview.service');

module.exports = {
	create: async (req) => {
		try {
			//userId_Blogreview
			console.log(req);
			req.body.userId_Blogreview = req.userId.id;
			//validate body
			const { error } = validate(req.body);
			if (error) return error.details[0].message;

			//save db
			let blogreview = new Blogreview(req.body);
			await blogreview.save();
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	getAll: async () => {
		try {
			let blogreview = await Blogreview.find({});
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	like: async (req) => {
		try {
			// find and update
			// console.log(req.body);
			// console.log(req.userId);
			//find targetpost id
			let blogreview = await Blogreview.findOne(
				//filter by object post id
				{ _id: req.body.target_id },
			);

			// update to array
			//user who like
			let userId = req.userId.id;

			let list_userId_Like = blogreview.userId_Like;
			let list_userId_DisLike = blogreview.userId_Dislike;
			//toggle button like and cant like if disliked
			if (!list_userId_Like.includes(userId)) {
				list_userId_Like.push(userId);
				list_userId_DisLike.pull(userId);
			} else if (list_userId_Like.includes(userId)) {
				list_userId_Like.pull(userId);
			}

			await blogreview.save();
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	dislike: async (req) => {
		try {
			// find and update
			let blogreview = await Blogreview.findOne(
				//filter
				{ _id: req.body.target_id },
			);

			// update to array

			let userId = req.userId.id;

			let list_userId_Like = blogreview.userId_Like;
			let list_userId_DisLike = blogreview.userId_Dislike;

			if (!list_userId_DisLike.includes(userId)) {
				list_userId_DisLike.push(userId);
				list_userId_Like.pull(userId);
			} else if (list_userId_DisLike.includes(userId)) {
				list_userId_DisLike.pull(userId);
			}

			await blogreview.save();
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
