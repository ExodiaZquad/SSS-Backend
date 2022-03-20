const mongoose = require('mongoose');

const blogreviewSchema = new mongoose.Schema({
	subjectId: {
		type: String,
	},
	subjectName: {
		type: String,
	},
	textBlogreview: {
		type: String,
	},
	userId_Blogreview: {
		type: String,
	},
	userName_Blogreview: {
		type: String,
	},
	userId_Like: {
		type: Array,
	},
	userId_Dislike: {
		type: Array,
	},
	typeOfsubject: {
		type: String,
	},
	datePostreview: {
		type: Date,
		default: Date.now,
	},
});

const Blogreview = mongoose.model('Blogreview', blogreviewSchema);
exports.Blogreview = Blogreview;
