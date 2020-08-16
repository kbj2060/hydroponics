import { CONTROL_SWITCH, CONTROL_SETTING } from "../constants/action-types";

export function controlSwitch() {
	return { type: "CONTROL_SWITCH", }
};

export function controlSetting() {
	return { type: "CONTROL_SETTING"}
}