const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = require('express').Router();

// POST XXXXXXX/api/auth/
router.post('/', async (req, res) => {
	// Authentication
	let token = await authController.auth(req.body);
	if (token) return res.status(200).send({ token, type: 'authentication' });

	// Registration
	token = await userController.register(req.body);
	if (token) return res.status(200).send({ token, type: 'register' });

	return res.status(400).send({ success: false });
});

module.exports = router;
