import {store} from "../../redux/store";

export const CheckLogin =  () => {
  return store.getState()['authentication']['login']['status'] === "SUCCESS"
}