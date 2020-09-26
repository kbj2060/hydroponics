import {loadState} from "../LocalStorage";

export const CheckLogin =  () => {
  if (loadState() === undefined || !loadState()['authentication']['status']['isLoggedIn']) {
    return false
  } else {
    return true
  }
}