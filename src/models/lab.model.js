const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	sec: {
		type: String,
		required: true,
	},
	credit: {
		type: String,
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
});

const Lab = mongoose.model('Lab', labSchema);
exports.Lab = Lab;
