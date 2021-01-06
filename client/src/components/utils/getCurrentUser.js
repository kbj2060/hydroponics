import {loadState} from "../LocalStorage";

export default function getCurrentUser () {
    return loadState('authentication')['status']['currentUser'];
  }
