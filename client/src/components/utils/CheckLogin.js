import {loadState} from "../LocalStorage";
import React from "react";

export const CheckLogin =  () => {
  if (loadState() === undefined || !loadState()['authentication']['status']['isLoggedIn']) {
    return false
  } else {
    return true
  }
}