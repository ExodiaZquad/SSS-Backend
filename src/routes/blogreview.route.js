const blogreviewController = require('../controllers/blogreview.controller');
const router = require('express').Router();
const auth = require('../middleware/auth.middleware');

router.post('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.create(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

router.get('/', auth, async (req, res) => {
	const blogreview = await blogreviewController.getAll();
	res.send(blogreview);
});

router.put('/like', auth, async (req, res) => {
	const blogreview = await blogreviewController.like(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

router.put('/dislike', auth, async (req, res) => {
	const blogreview = await blogreviewController.dislike(req.body);
	res.send(blogreview);
	// console.log(blogreview);
});

module.exports = router;
