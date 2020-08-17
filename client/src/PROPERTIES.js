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
	settings: [
		'co2', 'humidity', 'temperature', 'led'
	],
	settingMinMax : {
		'co2' : [500, 1500],
		'humidity' : [0, 100],
		'temperature' : [20, 30],
		'led' : [0, 24]
	},
	circleColorTable : {
		'plant1' : "#FF925D",
		'plant2' : "#FFCB3A",
		'plant3' : "#FF4F61"
	},
	unitsTable : {
		'humidity': '%',
		'co2': 'ppm',
		'temperature': '°C'
	},
	environmentsWordTable : {
		'humidity' : 'HUM',
		'temperature': 'TEMP',
		'co2': 'CO2',
		'led' : 'LED',
	},
	statusUpdateTime : 10 * 1000,
	historyUpdateTime : 10 * 1000,
	currentUpdateTime : 10 * 1000,
	showHistoryNumber : 20,
	ip : "http://192.168.0.21",
	mqttPort : "1883",
	socketIoPort : "9000",
};
