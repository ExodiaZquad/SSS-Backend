const subjectController = require('../controllers/subject.controller');

const router = require('express').Router();

router.get('/', async (req, res) => {
	const { id } = req.query;
	const subject = await subjectController.findSubjectById(id);

	res.send(subject);
});

module.exports = router;
