const mongoose = require('mongoose');

const blogreviewSchema = new mongoose.Schema({
	subjectId: {
		type: String,
		required: true,
	},
	subjectName: {
		type: String,
		required: true,
	},
	textBlogreview: {
		type: String,
		required: true,
	},
	userId_Blogreview: {
		type: String,
		required: true,
	},
	userName_Blogreview: {
		type: String,
		required: true,
	},
	userId_Like: {
		type: [],
	},
	userId_Dislike: {
		type: [],
	},
	typeOfsubject: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
		required: true,
	},
});

const Blogreview = mongoose.model('Blogreview', blogreviewSchema);
exports.Blogreview = Blogreview;
