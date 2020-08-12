import { CONTROL_SETTING } from "../constants/action-types";

function ControlSetting(state =false, action) {
	switch(action.type){
		case 'CONTROL_SETTING':
			return !state
		default:
			return state
	}
};

export default ControlSetting;