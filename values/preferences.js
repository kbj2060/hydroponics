module.exports = {
  // TODO [SERVER CHANGE] : IP & SOCKET_HOST in automation/preferences.json
  ip : "121.157.207.47",
  mqttPort : "1883",
  mqttURL : "mqtt://192.168.0.3",
  socketIoPort : "9000",
  pages : [
    '무들로 29', 'setting', 'logout'
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
    's1-1', 's1-2', 's1-3'
  ],
  autoItem: [
    'led', 'heater','cooler', 'fan', 'waterpump'
  ],
  settingType: {
    'fan' : 'cycle',
    'waterpump' : 'cycle',
    'cooler' : 'range',
    'heater' : 'range',
    'led' : 'range',
  },
}
