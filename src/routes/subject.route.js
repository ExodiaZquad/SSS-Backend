const combinations = require('combinations');
const subjectController = require('../controllers/subject.controller');
const scheduleController = require('../controllers/schedule.controller');
const { isSameIdInList } = require('../services/schedule.service');
const router = require('express').Router();
const _ = require('lodash');

router.get('/', async (req, res) => {
	const { id } = req.query;
	const subject = await subjectController.findSubjectById(id);

	if (_.isEmpty(subject)) return res.status(400).send({ success: false });

	return res.send(subject);
});

router.post('/filter', async (req, res) => {
	const { subjects } = req.body;

	const theories = await subjectController.findTheoriesByIdAndSec(subjects);
	if (!theories) return res.status(400).send({ success: 1 });

	const labs = await subjectController.findLabs();
	if (!labs) return res.status(400).send({ success: 2 });

	let combination = combinations(theories).filter(
		(temp) => temp.length == subjects.length && !isSameIdInList(temp),
	);

	const generated = scheduleController.generateSchdule(combination, labs);

	const gened = await subjectController.findGened();

	const ret = await subjectController.filterGened(generated, gened);
	if (!ret.length) return res.status(400).send({ success: false });

	const formatGened = subjectController.formatGened(ret);

	return res.send(formatGened);
});

module.exports = router;
