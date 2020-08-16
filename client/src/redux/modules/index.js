import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";
import ControlSetting from "./ControlSetting";

const allReducers = combineReducers({
	controlSwitch: ControlSwitch,
	controlSetting: ControlSetting,
});

export default allReducers;



