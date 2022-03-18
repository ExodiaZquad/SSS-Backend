const { User } = require('../models/user.model');
const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.post('/', async (req, res) => {
	const user = await userController.create(req.body);
	res.send(user);
});

module.exports = router;
