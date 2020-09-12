import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_SETTING = "ControlSetting/CONTROL_SETTING";
const RESET_SETTING = "ControlSetting/RESET_SETTING";
const SAVE_SETTING = "ControlSetting/SAVE_SETTING";

const {defaultSetting} = require('root/init_setting');

export const  controlSetting = setting => {
  return { type: CONTROL_SETTING, setting}
}

export const  saveSetting = setting => {
  return { type: SAVE_SETTING, setting}
}

export const  resetSetting = () => {
  return { type: RESET_SETTING }
}

let initialState = '';
try {
  initialState = loadState()['controlSetting'];
} catch(e) {
  initialState = defaultSetting;
}

function ControlSetting(state = initialState, action) {
  switch(action.type){
    case CONTROL_SETTING:
      const key = Object.keys(action.setting)[0];
      const value = Object.values(action.setting)[0];
      return { ...state, [key]: value };
    case SAVE_SETTING:
      return action.setting;
    case RESET_SETTING:
      return defaultSetting;
    default:
      return initialState
  }
};

export default ControlSetting;