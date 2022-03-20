const blogreviewController = require('../controllers/blogreview.controller');
const router = require('express').Router();

router.post('/', async (req, res) => {
	const blogreview = await blogreviewController.create(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

router.get('/', async (req, res) => {
	const blogreview = await blogreviewController.getAll();
	res.send(blogreview);
	console.log(blogreview);
});

module.exports = router;
