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
	WordsTable : {
		'humidity' : '습도',
		'temperature': '온도',
		'co2': '이산화탄소',
		'led' : '조명',
		'fan' : '환풍기',
		'airconditioner' : '에어컨',
		"dashboard" : '홈',
		"settings" : '설정',
		"logout" : '로그아웃',
		'plant1' : '1 지점',
		'plant2' : '2 지점',
		'plant3' : '3 지점'
	},
	statusUpdateTime : 10 * 1000,
	historyUpdateTime : 10 * 1000,
	currentUpdateTime : 10 * 1000,
	showHistoryNumber : 20,
	ip : "http://127.0.0.1",
	mqttPort : "1883",
	socketIoPort : "9000",
};
