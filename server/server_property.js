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
	ip : "localhost",
	mqttPort : "1883",
	socketIoPort : "9000",
};
