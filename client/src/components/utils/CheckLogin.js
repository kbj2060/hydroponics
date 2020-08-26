import {loadState} from "../LocalStorage";
import React from "react";

export const CheckLogin =  () => {
  const loginStatus = loadState()['authentication']['status']['isLoggedIn'];
  if (!loginStatus || loadState() === undefined) {
    return false
  } else {
    return true
  }
}