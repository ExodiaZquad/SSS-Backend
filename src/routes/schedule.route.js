const combinations = require('combinations');
const subjectController = require('../controllers/subject.controller');
const scheduleController = require('../controllers/schedule.controller');
const { isSameIdInList } = require('../services/schedule.service');
const auth = require('../middleware/auth.middleware');
const router = require('express').Router();

router.post('/generate', auth, async (req, res) => {
	const { subjects } = req.body;

	const theories = await subjectController.findTheoriesByIdAndSec(subjects);
	if (!theories) return res.status(400).send({ success: 1 });

	const labs = await subjectController.findLabs();
	if (!labs) return res.status(400).send({ success: 2 });

	// combination theories : filter => lenght == 4 && uniqe ID
	let combination = combinations(theories).filter(
		(temp) => temp.length == subjects.length && !isSameIdInList(temp),
	);

	console.log('combination', combination.length);
	// console.log(combination);
	// console.log(combination.length);

	// Generate schedules
	const generated = scheduleController.generateSchdule(combination, labs);
	console.log('generated', generated.length);

	// //// Read the generated
	// // for (let i = 0; i < generated.length; i++) {
	// // 	console.log('Value:', i + 1);
	// // 	for (let j = 0; j < generated[i].length; j++) {
	// // 		const { name, sec, type } = generated[i][j];
	// // 		console.log(type, '------', sec, '------', name);
	// // 	}
	// // 	console.log('');
	// // }

	return res.send(generated);
});

module.exports = router;
