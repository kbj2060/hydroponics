import {loadState} from "root/client/src/components/LocalStorage";
import {checkEmpty} from "../../components/utils/CheckEmpty";

const CONTROL_SWITCH = "CONTROL_SWITCH";
const SAVE_SWITCH = "SAVE_SWITCH";

export function controlSwitch(_switch) {
  return { type: CONTROL_SWITCH, _switch }
};

export function saveSwitch(_switch) {
  return { type: SAVE_SWITCH, _switch }
}

let initialState = '';
try {
  initialState = loadState()['controlSwitch'];
} catch(e) {
  initialState = {
    'cooler': false, 'heater':false, 'led':false, 'fan':false, 'waterpump':false
  }
}

function ControlSwitch(state =initialState, action) {
  switch(action.type){
    case CONTROL_SWITCH:
      const key = Object.keys(action._switch)[0];
      const value = Object.values(action._switch)[0];
      return { ...state, [key]: value };
    case SAVE_SWITCH:
      return action._switch;
    default:
      try{
        if (checkEmpty(loadState()['controlSwitch'])) {
          return state
        } else {
          return loadState()['controlSwitch'];
        }
      }
      catch(e){
        return state
      }
  }
};

export default ControlSwitch;