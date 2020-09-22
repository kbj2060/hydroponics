import {loadState} from "root/client/src/components/LocalStorage";
import {checkEmpty} from "../../components/utils/CheckEmpty";

const CONTROL_AC_TYPE = "CONTROL_AC_TYPE";

export const  controlACtype = ACtype => {
  return { type: CONTROL_AC_TYPE, ACtype}
}


function ControlACtype(state=0, action) {
  switch(action.type){
    case CONTROL_AC_TYPE:
      return action.ACtype;
    default:
      try{
	      if(checkEmpty(loadState()['controlACtype'])){ return state }
        else { return loadState()['controlACtype']; }
      } catch(e){
        return state
      }
  }
};

export default ControlACtype;
