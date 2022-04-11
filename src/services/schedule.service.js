function isSameIdInList(list) {
	let checkIds = [];
	for (let i = 0; i < list.length; i++) {
		if (checkIds.includes(list[i].id)) return true;
		else checkIds.push(list[i].id);
	}
	return false;
}

function dateRangeOverlaps(a, b) {
	if (a.start <= b.start && b.start < a.end) return true; // b starts in a
	if (a.start < b.end && b.end <= a.end) return true; // b ends in a
	if (b.start < a.start && a.end < b.end) return true; // a in b
	return false;
}

function isTimeOverlap(data, type) {
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < i; j++) {
			if (dateRangeOverlaps(data[i][type], data[j][type])) return true;
		}
	}
	return false;
}

function isOverlap(schedule) {
	const isClassOverlap = isTimeOverlap(schedule, 'class');
	const isMidtermOverlap = isTimeOverlap(schedule, 'midterm');
	const isFinalOverlap = isTimeOverlap(schedule, 'final');

	return isClassOverlap || isMidtermOverlap || isFinalOverlap;
}

exports.isSameIdInList = isSameIdInList;
exports.isOverlap = isOverlap;
