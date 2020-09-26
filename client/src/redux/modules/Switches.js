import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_SETTING = "ControlSetting/CONTROL_SETTING";
const RESET_SETTING = "ControlSetting/RESET_SETTING";
const SAVE_SETTING = "ControlSetting/SAVE_SETTING";

const {defaultSetting} = require('root/init_setting');

export const  Switches = _switch => {
  return { type: SWITCHES, _switch}
}

let initialState = '';
try {
  initialState = loadState()['switches'];
} catch(e) {
  initialState = defaultSetting;
}

function Switches(state = initialState, action) {
  switch(action.type){
    case SWITCHES:
      const key = Object.keys(action.setting)[0];
      const value = Object.values(action.setting)[0];
      return { ...state, [key]: value };
    default:
      return initialState
  }
};

export default Switches;