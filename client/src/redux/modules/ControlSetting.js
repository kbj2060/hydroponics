import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_SETTING = "ControlSetting/CONTROL_SETTING";
const {settingMinMax} = require('root/init_setting');

export const  controlSetting = setting => {
  return { type: CONTROL_SETTING, setting}
}

const initialState = loadState()['controlSetting'];

function ControlSetting(state = initialState, action) {
  switch(action.type){
    case CONTROL_SETTING:
      const key = Object.keys(action.setting)[0];
      const value = Object.values(action.setting)[0];
      return { ...state, [key]: value }
    default:
      return initialState
  }
};

export default ControlSetting;