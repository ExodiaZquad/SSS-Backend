const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

// router.get('/', auth, async (req, res) => {
// 	console.log('userId: ', req.userId);
// 	res.send('PASS');
// });

// @desc Get user's name and imgUrl
// @route /api/users/
router.get('/', auth, async (req, res) => {
	await userController.getUserData(req, res);
});

// @desc Get User Profile Data (user's review post, user's favorite schedule)
// @route /api/users/profile
router.get('/profile', auth, async (req, res) => {
	await userController.getProfileData(req, res);
});

module.exports = router;
