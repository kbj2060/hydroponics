module.exports = {
	machines: [
	'AirConditioner', 'LED'
	],
	n_machines: {
		'AirConditioner': 2,
		'LED': 4
	},
	environments: [
		'co2', 'humidity', 'temperature'
	],
	plants: [
		'plant1', 'plant2', 'plant3',
	],
	statusUpdateTime : 5 * 1000,
	historyUpdateTime : 5 * 1000,
	currentUpdateTime : 5 * 1000,
	showHistoryNumber : 20,

};
