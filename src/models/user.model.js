const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	googleId: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	favSchedule: {
		type: [],
	},
});

const User = mongoose.model('User', userSchema);
exports.User = User;
