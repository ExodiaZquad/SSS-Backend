const combinations = require('combinations');
const subjectController = require('../controllers/subject.controller');
const scheduleController = require('../controllers/schedule.controller');
const { isSameIdInList } = require('../services/schedule.service');
const router = require('express').Router();

router.get('/generate', async (req, res) => {
	// GET theories form id
	const { subjects: subjectsId } = req.body;
	const theories = await subjectController.findTheoriesById(subjectsId);

	// GET all labs
	const labs = await subjectController.findLabs();

	// combination : filter => lenght == 4 && uniqe ID
	let combination = combinations(theories).filter(
		(temp) => temp.length == 4 && !isSameIdInList(temp),
	);

	// Generate schedules
	const generated = scheduleController.generateSchdule(combination, labs);
	// console.log(generated.length);

	//// Read the generated
	// for (let i = 0; i < generated.length; i++) {
	// 	console.log('Value:', i + 1);
	// 	for (let j = 0; j < generated[i].length; j++) {
	// 		const { name, sec, type } = generated[i][j];
	// 		console.log(type, '------', sec, '------', name);
	// 	}
	// 	console.log('');
	// }

	return res.send(generated);
});

module.exports = router;
