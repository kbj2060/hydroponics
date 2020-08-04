import { combineReducers } from "redux";
import ControlSwitch from "./ControlSwitch";

const allReducers = combineReducers({
	controlSwitch: ControlSwitch,
});

export default allReducers;



