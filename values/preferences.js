module.exports = {
  // TODO [SERVER CHANGE] : IP & SOCKET_HOST in automation/preferences.json
  // ip : "121.157.207.47",
  ip : "127.0.0.1",
  mqttPort : "1883",
  mqttURL : "mqtt://192.168.0.3",
  socketIoPort : "9000",
  pages : [
    '무들로29', 'setting', 'logout'
  ],
  machines: {
    "s1" : ['cooler', 'heater', 'led', 'fan', 'waterpump']
  },
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
  sections: [
    's1-1', 's1-2', 's1-3'
  ],
  autoItem:{
   "s1" : ['led', 'heater','cooler', 'fan', 'waterpump']
  }
  ,
  settingType: {
    "s1": {
      'fan': 'cycle',
      'waterpump': 'cycle',
      'cooler': 'range',
      'heater': 'range',
      'led': 'range',
    }
  },
}
