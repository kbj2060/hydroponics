import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlSetting from "./ControlSetting";
import Authentication from "./Authentication";
import ControlPage from "./ControlPage";

const allReducers = combineReducers({
	controlSwitch: ControlSwitch,
	controlSetting: ControlSetting,
	authentication: Authentication,
	controlPage: ControlPage,
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



