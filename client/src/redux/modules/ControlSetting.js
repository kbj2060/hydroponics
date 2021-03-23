import {loadState} from "../../components/LocalStorage";

const CONTROL_SETTING = "CONTROL_SETTING";
const RESET_SETTING = "RESET_SETTING";
const SAVE_SETTING = "SAVE_SETTING";

const {auto} = require('../../values/defaults.json')

export const  controlSetting = setting => {
  return { type: CONTROL_SETTING, setting}
}

export const  saveSetting = setting => {
  return { type: SAVE_SETTING, setting}
}

export const  resetSetting = () => {
  return { type: RESET_SETTING }
}

let initialState = loadState('auto') || auto

function ControlSetting(state = initialState, action) {
  switch(action.type){
    case CONTROL_SETTING:
      const key = Object.keys(action.setting)[0];
      const value = Object.values(action.setting)[0];
      return { ...state, [key]: value };
    case SAVE_SETTING:
      return action.setting;
    case RESET_SETTING:
      return auto;
    default:
      return state
  }
}

export default ControlSetting;