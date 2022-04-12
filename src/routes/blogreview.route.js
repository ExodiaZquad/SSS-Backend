const blogreviewController = require('../controllers/blogreview.controller');
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.create(req, res);
	// if (blogreview) {
	// 	return res.status(201).send(blogreview);
	// }
	// if (blogreview === error) {
	// 	return res.status(400).send(blogreview);
	// }
	// console.log(blogreview);
});

router.get('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.getAll();
	if (blogreview) return res.status(200).send(blogreview);
	return res.status(400).send(blogreview);
});

router.put('/like', auth, async (req, res) => {
	const blogreview = await blogreviewController.like(req, res);
	// res.status(200).send('200 updated');
	// res.send(blogreview);
	// console.log(blogreview);
});

router.put('/dislike', auth, async (req, res) => {
	const blogreview = await blogreviewController.dislike(req, res);
	// res.status(200).send('200 updated');
	// res.send(blogreview);
	// console.log(blogreview);
});

module.exports = router;
