module.exports = {
	machines: [
		'AirConditioner', 'LED', 'FAN'
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
	ip : "http://127.0.0.1",
	mqttPort : "1883",
	socketIoPort : "9000",
};
