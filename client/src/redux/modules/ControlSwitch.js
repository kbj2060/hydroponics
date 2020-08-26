import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_SWITCH = "CONTROL_SWITCH";

export function controlSwitch() {
  return { type: CONTROL_SWITCH }
};

function ControlSwitch(state =false, action) {
  switch(action.type){
    case CONTROL_SWITCH:
      return !state
    default: // need this for default case
      return loadState()['controlSwitch'];
  }
};

export default ControlSwitch;