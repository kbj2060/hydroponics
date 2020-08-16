const CONTROL_SETTING = "ControlSetting/CONTROL_SETTING";

export const  controlSetting = setting => {
  return { type: CONTROL_SETTING, setting}
}

const {settingMinMax} = require('PROPERTIES')
const co2Min = settingMinMax['co2'][0],
      tempMin = settingMinMax['temperature'][0],
      humMin = settingMinMax['humidity'][0],
      ledMin = settingMinMax['led'][0]

const initialState = {
  co2 : [settingMinMax['co2'][0], 0],
  temperature: [0, 0],
  humidity: [0, 0],
  led: [0, 0]
};

function ControlSetting(state = initialState, action) {
  switch(action.type){
    case CONTROL_SETTING:
      const key = Object.keys(action.setting)[0];
      const value = Object.values(action.setting)[0];
      return {
        ...state, [key]: value
      }
    default:
      return initialState
  }
};

export default ControlSetting;