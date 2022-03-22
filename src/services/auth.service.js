const bcrypt = require('bcrypt');
const { generateAuthToken } = require('../services/user.service');

const findUserbByGoogleId = async (users, googleId) => {
	for (let i = 0; i < users.length; i++) {
		const validGoogleId = await bcrypt.compare(googleId, users[i].googleId);
		if (validGoogleId) return generateAuthToken(users[i]._id);
	}

	return null;
};

exports.findUserbByGoogleId = findUserbByGoogleId;
