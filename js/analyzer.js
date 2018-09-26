const gistURL = 'https://gist.githubusercontent.com/Igormandello/a8d8d01fb9997c1120a18a2b1bdf20ad/raw/3439ce0ae2c27282182fcf15268d1266834d420d/Schedule';
const classTimes = [
	{ h: 7, m: 30 },
	{ h: 8, m: 20 },
	{ h: 9, m: 10 },
	{ h: 10, m: 00, interval: true },
	{ h: 10, m: 15 },
	{ h: 11, m: 05 },
	{ h: 11, m: 55, interval: true },
	{ h: 13, m: 00 },
	{ h: 13, m: 50 },
	{ h: 14, m: 40 },
	{ h: 15, m: 30 },
	{ h: 15, m: 45, interval: true },
	{ h: 16, m: 35 },
	{ h: 17, m: 25 },
	{ h: 18, m: 15, interval: true },
	{ h: 19, m: 00 },
	{ h: 19, m: 40 },
	{ h: 20, m: 20 },
	{ h: 21, m: 00, interval: true },
	{ h: 21, m: 10 },
	{ h: 21, m: 50 },
];

const closeTime = {
	h: 22,
	m : 30
};

const weekdays = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday'
];

const labNames = [
	'dinalva',
	'claudio',
	'lapa'
]

var schedule;
function setup(data, callback) {
	let classes = data.split('\n');

	let intervalQtty = 0;
	classTimes.forEach(obj => {
		if (obj.interval)
			intervalQtty++;
	});

	schedule = {};
	for (let i = 0; i < weekdays.length; i++) {
		let actualWeekday = {};
		for (let n = 0; n < labNames.length; n++) {
			//actualWeekday[labNames[n]] = [];
			let actualLab = [];

			let timeIndex = 0;
			for (let j = 0; j < classTimes.length; j++)
				if (!classTimes[j].interval) {
					//+1 to skip the separator between each day
					let actualClass = classes[(i * 3 + n) * (classTimes.length - intervalQtty + 1) + timeIndex];

					actualLab.push(actualClass); 
					timeIndex++;
				} else
					actualLab.push('Interval'); 

			actualWeekday[labNames[n]] = actualLab;
			schedule[weekdays[i]] = actualWeekday;
		}
	}

	callback();
}

function lab() {
	let now = new Date(Date.now());

	let weekday = weekdays[now.getDay() - 1],
			hours = now.getHours(),
			minutes = now.getMinutes();

	if (closeTime.h < hours || (closeTime.h == hours && closeTime.m <= minutes))
		return null;

	let i = 0;
	for (; i < classTimes.length - 1; i++) {
		let actualClass = classTimes[i];

		if (actualClass.h > hours || (actualClass.h == hours && actualClass.m > minutes)) {
			i--; //The next class is i, so the actual class is i - 1 
			break;
		}
	}

	if (i < 0 || i > classTimes.length)
		return null;
	else
		return [
			schedule[weekday].dinalva[i],
			schedule[weekday].claudio[i],
			schedule[weekday].lapa[i]
		];
}