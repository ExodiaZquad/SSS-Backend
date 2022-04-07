const { required } = require('joi');
const mongoose = require('mongoose');

const blogreviewSchema = new mongoose.Schema({
	subjectId: {
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
	userId_Like: {
		//userid object
		type: [],
	},
	userId_Dislike: {
		//userid object
		type: [],
	},
	rate: {
		type: Number,
		default: 1,
	},
	date: {
		type: Date,
		default: Date.now(),
		required: true,
	},
});

const Blogreview = mongoose.model('Blogreview', blogreviewSchema);
exports.Blogreview = Blogreview;
