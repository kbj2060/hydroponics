module.exports = {
	pages : [
		'dashboard', 'settings', 'login'
	],
	machines: [
	'airconditioner', 'led', 'fan', 'waterpump'
	],
	n_machines: {
		'airconditioner': 2,
		'led': 4,
		'waterpump': 1,
		'fan' : 4,
	},
	environments: [
		'co2', 'humidity', 'temperature'
	],
	plants: [
		'1', '2', '3'
	],
	settings: [
		'co2', 'humidity', 'temperature', 'led'
	],
	settingMinMax : {
		'co2' : [0, 2000],
		'humidity' : [0, 100],
		'temperature' : [10, 40],
		'led' : [0, 23]
	},
	circleColorTable : {
		'1' : "#FF925D",
		'2' : "#FFCB3A",
		'3' : "#FF4F61"
	},
	unitsTable : {
		'humidity': '%',
		'co2': 'ppm',
		'temperature': '°C',
		'led' : '시'
	},
	WordsTable : {
		'humidity' : '습도',
		'temperature': '온도',
		'co2': '이산화탄소',
		'led' : '조명',
		'fan' : '환풍기',
		'airconditioner' : '에어컨',
		'waterpump' : '급수',
		"dashboard" : '홈',
		"settings" : '설정',
		"logout" : '로그아웃',
		'plant1' : '1 지점',
		'plant2' : '2 지점',
		'plant3' : '3 지점'
	},
	statusUpdateTime : 10 * 1000,
	historyUpdateTime : 10 * 1000,
	currentUpdateTime : 5 * 1000,
	showHistoryNumber : 20,
	ip : "121.157.207.47",
	mqttPort : "1883",
	socketIoPort : "9000",
};
