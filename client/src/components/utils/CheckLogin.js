import {loadState} from "../LocalStorage";

export const CheckLogin =  () => {
  return !(loadState() === undefined || !loadState()['authentication']['status']['isLoggedIn']);
}