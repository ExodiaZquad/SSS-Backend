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
			let blogreview = await Blogreview.find({});
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	like: async (body) => {
		try {
			// find and update
			let blogreview = await Blogreview.findOne(
				//filter
				{ _id: body.targetIdObject },
			);

			// update to array

			let userId = body.userId;
			let list_userId_Like = blogreview.userId_Like;
			let list_userId_DisLike = blogreview.userId_Dislike;

			if (
				!list_userId_Like.includes(userId) &&
				!list_userId_DisLike.includes(userId)
			) {
				list_userId_Like.push(userId);
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

	dislike: async (body) => {
		try {
			// find and update
			let blogreview = await Blogreview.findOne(
				//filter
				{ _id: body.targetIdObject },
			);

			// update to array

			let userId = body.userId;
			let list_userId_Like = blogreview.userId_Like;
			let list_userId_DisLike = blogreview.userId_Dislike;

			if (
				!list_userId_Like.includes(userId) &&
				!list_userId_DisLike.includes(userId)
			) {
				list_userId_DisLike.push(userId);
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
