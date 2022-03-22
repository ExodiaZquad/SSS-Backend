const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
	console.log('userId: ', req.userId);
	res.send('PASS');
});

module.exports = router;
