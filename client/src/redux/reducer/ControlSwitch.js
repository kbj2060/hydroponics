import { CONTROL_SWITCH } from "../constants/action-types";

function ControlSwitch(state =false, action) {
	switch(action.type){
		case 'CONTROL_SWITCH':
			return !state
		default: // need this for default case
			return state
	}
};

export default ControlSwitch;