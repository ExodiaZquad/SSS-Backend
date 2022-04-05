const blogreviewController = require('../controllers/blogreview.controller');
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.create(req);
	// res.status(201).send('201 Created');
	res.status(200).send(blogreview);
	// console.log(blogreview);
});

router.get('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.getAll();
	res.status(200).send(blogreview);
});

router.put('/like', auth, async (req, res) => {
	const blogreview = await blogreviewController.like(req);
	// res.status(200).send('200 updated');
	res.status(200).send(blogreview);
	// console.log(blogreview);
});

router.put('/dislike', auth, async (req, res) => {
	const blogreview = await blogreviewController.dislike(req);
	// res.status(200).send('200 updated');
	res.status(200).send(blogreview);
	// console.log(blogreview);
});

module.exports = router;
