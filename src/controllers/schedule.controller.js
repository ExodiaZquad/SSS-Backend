const { isOverlap } = require('../services/schedule.service');

module.exports = {
	generateSchdule: (combination, labs) => {
		try {
			let generated = [];

			for (let i = 0; i < combination.length; i++) {
				let schedule = combination[i];

				let backup = [];
				for (let j = 0; j < schedule.length; j++) {
					if (!schedule[j].hasLab) continue;

					for (let k = 0; k < labs.length; k++) {
						if (labs[k].id == schedule[j].id) {
							if (labs[k].sec.slice(-1) == schedule[j].sec) {
								backup.push(labs[k]);
								break;
							}
						}
					}
				}

				schedule = schedule.concat(backup);

				if (isOverlap(schedule)) continue;

				generated.push(schedule);
			}

			return generated;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
