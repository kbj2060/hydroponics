import update from 'react-addons-update';
import {loadState, saveState} from "../../components/LocalStorage";
import {checkEmpty} from "../../components/utils/CheckEmpty";

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (username) => {
  return {
    type: AUTH_LOGIN_SUCCESS, username
  };
}

export const loginFailure = () => {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}

export const logout = () => {
  return {
    type: LOGOUT
  };
}


const initialState = {
  login: {
    status: 'INIT'
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  }
};

function Authentication(state, action) {
  if(typeof state === "undefined")
    state = initialState;

  switch(action.type) {
    case AUTH_INIT:
      return initialState;

    case AUTH_LOGIN_SUCCESS:
      console.log('login success');
      return update(state, {
        login: {
          status: { $set: 'SUCCESS' }
        },
        status: {
          isLoggedIn: { $set: true },
          currentUser: { $set: action.username }
        }
      });

    case AUTH_LOGIN_FAILURE:
      console.log('login failed');
      return update(state, {
        login: {
          status: { $set: 'FAILURE' }
        }
      });

    case LOGOUT:
      saveState("authentication", initialState)
      return initialState;

    default:
      try {
        return checkEmpty(loadState('authentication'))?
          state : loadState('authentication');
      }
      catch(e){
        return initialState
      }
  }
}

export default Authentication;