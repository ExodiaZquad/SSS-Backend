const mongoose = require('mongoose');

const theorySchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	sec: {
		type: String,
		required: true,
	},
	credit: {
		type: Number,
		required: true,
	},
	day: {
		type: Number,
	},
	note: {
		type: String,
	},
	teachers: {
		type: [],
		required: true,
	},
	class: {
		type: {},
		required: true,
	},
	midterm: {
		type: {},
		required: true,
	},
	final: {
		type: {},
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	hasLab: {
		type: Boolean,
		default: false,
	},
});

const Theory = mongoose.model('Theory', theorySchema);
exports.Theory = Theory;
