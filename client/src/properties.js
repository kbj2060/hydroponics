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
	statusUpdateTime : 10 * 1000,
	historyUpdateTime : 10 * 1000,
	currentUpdateTime : 10 * 1000,
	showHistoryNumber : 20,
	ip : "http://121.157.207.47/",
	mqttPort : "1883",
	socketIoPort : "9000",
};
