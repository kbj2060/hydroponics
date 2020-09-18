import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlSetting from "./ControlSetting";
import Authentication from "./Authentication";

const allReducers = combineReducers({
	controlSwitch: ControlSwitch,
	controlSetting: ControlSetting,
	authentication: Authentication
});
/*
const rootReducer = (state, action) => {
	if (action.type === LOGOUT) {
		state = undefined
		resetState();
		console.log('redux clear');
	}
	return allReducers(state, action)
}*/

export default allReducers;



