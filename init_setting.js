
module.exports = {
	pages : [
		'dashboard', 'logout'
	],
	machines: [
		'cooler', 'heater', 'led', 'fan', 'waterpump'
	],
	n_machines: {
		'heater': 2,
		'cooler': 2,
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
		'led', 'temperature', 'fan', 'waterpump'
	],
	settingType: {
		'fan' : 'cycle',
		'waterpump' : 'cycle',
		'temperature' : 'range',
		'led' : 'range',
	},
	settingMinMax : {
		'fan' : {
			start: [], end: [], term: 1
		},
		'waterpump' : {
			start: [], end: [], term: 1
		},
		'temperature' : [10, 40],
		'led' : [0, 23]
	},
	defaultSetting : {
		'fan' : {
			start: [], end: [], term: 1, enable: false
		},
		'waterpump' : {
			start: [], end: [], term: 1, enable: false
		},
		'temperature' : {
			range : [10, 40], enable: false
		},
		'led' : {
			range: [0, 23], enable: false
}
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
		'led' : '시',
		'fan' : '시간',
		'waterpump' : '시간'
	},
	WordsTable : {
		'cooler': '냉방',
		'heater': '난방',
		'humidity' : '습도',
		'temperature': '온도',
		'co2': '이산화탄소',
		'led' : '조명',
		'fan' : '환기',
		'airconditioner' : '공조기',
		'waterpump' : '급수',
		"dashboard" : '홈',
		"settings" : '설정',
		"logout" : '로그아웃',
		'plant1' : '1 지점',
		'plant2' : '2 지점',
		'plant3' : '3 지점'
	},
	statusUpdateTime : 10.7 * 1000,
	historyUpdateTime : 60.3 * 1000,
	currentUpdateTime : 4.3 * 1000,
	showHistoryNumber : 20,
	ip : "localhost",
	mqttPort : "1883",
	socketIoPort : "9000",
};
