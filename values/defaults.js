let temperatureMin = 10,
    temperatureMax = 40,
    ledMin = 0,
    ledMax = 23,
    defaultTerm = 1

module.exports = {
  currentCriteria : 1,
  showHistoryNumber : 20,
  defaultSetting : {
    'fan' : {
      start: [], end: [], term: defaultTerm, enable: false
    },
    'waterpump' : {
      start: [], end: [], term: defaultTerm, enable: false
    },
    'heater' : {
      range : [temperatureMin, temperatureMax], enable: false
    },
    'cooler' : {
      range : [temperatureMin, temperatureMax], enable: false
    },
    'led' : {
      range: [ledMin, ledMax], enable: false
    }
  },
}