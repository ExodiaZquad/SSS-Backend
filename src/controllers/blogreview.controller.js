const { Blogreview } = require('../models/blogreview.model');
const {
	validate,
	validate_like_dislike,
} = require('../services/blogreview.service');

module.exports = {
	create: async (req, res) => {
		try {
			//userId_Blogreview
			// console.log(req);
			req.body.userId_Blogreview = req.userId.id;
			//validate body
			const { error } = validate(req.body);
			if (error) return res.status(400).send(error.details[0].message);

			//save db
			let blogreview = new Blogreview(req.body);
			await blogreview.save();
			return res.status(201).send(blogreview);
		} catch (error) {
			console.log(error);
			return res.status(404).send();
		}
	},

	getAll: async (req, res) => {
		try {
			let blogreview = await Blogreview.find({});
			return blogreview;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	like: async (req, res) => {
		try {
			// find and update

			//validate
			const { error } = validate_like_dislike(req.body);
			if (error) return error.details[0].message;
			//find targetpost id
			let blogreview = await Blogreview.findOne(
				//filter by object post id
				{ _id: req.body.target_id },
			);
			if (!blogreview) return res.status(404).send('NOT FOUND');

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
			return res.status(200).send();
		} catch (error) {
			console.log(error);
			return res.status(404).send();
		}
	},

	dislike: async (req, res) => {
		try {
			// find and update

			//validate
			const { error } = validate_like_dislike(req.body);
			if (error) return error.details[0].message;

			let blogreview = await Blogreview.findOne(
				//filter
				{ _id: req.body.target_id },
			);
			if (!blogreview) return res.status(404).send('NOT FOUND');

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
			return res.status(200).send();
		} catch (error) {
			console.log(error);
			return res.status(404).send();
		}
	},
};
