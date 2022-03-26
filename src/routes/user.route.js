const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
	console.log('userId: ', req.userId);
	res.send('PASS');
});

// @desc Get User Profile Data (user's review post, user's favorite schedule)
// @route /api/users/profile
router.get('/profile', auth, async (req, res) => {
	const data = await userController.getProfileData(req.userId);
	if (data) res.send(data).status(200);
	res.status(400);
});

module.exports = router;
