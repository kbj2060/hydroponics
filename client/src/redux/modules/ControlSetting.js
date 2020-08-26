import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_SETTING = "ControlSetting/CONTROL_SETTING";
const {settingMinMax} = require('root/init_setting');

export const  controlSetting = setting => {
  return { type: CONTROL_SETTING, setting}
}


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
      return loadState()['controlSetting'];
  }
};

export default ControlSetting;