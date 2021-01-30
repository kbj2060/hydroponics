import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlSetting from "./ControlSetting";
import Authentication from "./Authentication";
import ControlScheduleDate from "./ControlScheduleDate";

const allReducers = combineReducers({
	switches: ControlSwitch,
	auto: ControlSetting,
	authentication: Authentication,
	date : ControlScheduleDate
});
/*
const rootReducer = (state, action) => {
	if (action.type === AUTH_LOGIN_SUCCESS) {
		state = undefined
		resetState();
		console.log('redux clear');
	}
	return allReducers(state, action)
}*/

export default allReducers;



