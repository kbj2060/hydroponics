module.exports = {
	machines: [
		'AirConditioner', 'LED', 'FAN', 'WaterPump'
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
	serverSubscribe: [
		'plant1', 'plant2', 'plant3', 'AirConditioner', 'LED', 'FAN', 'WaterPump', 'current'
	],
	ip : "localhost",
	mqttPort : "1883",
	socketIoPort : "9000",
};
