import {loadState} from "root/client/src/components/LocalStorage";

const CONTROL_PAGE = "ControlPage/CONTROL_PAGE";

export const  controlPage = page => {
  return { type: CONTROL_PAGE, page}
}

let initialState = '';
try {
  initialState = loadState()['controlPage'];
} catch(e) {
  initialState = '';
}

function ControlPage(state = initialState, action) {
  switch(action.type){
    case CONTROL_PAGE:
      return action.page;
    default:
      return initialState
  }
}

export default ControlPage;