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
});

router.put('/like', async (req, res) => {
	const blogreview = await blogreviewController.like(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

router.put('/dislike', async (req, res) => {
	const blogreview = await blogreviewController.dislike(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

module.exports = router;
