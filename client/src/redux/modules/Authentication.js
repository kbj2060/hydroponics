import update from 'react-addons-update';
import {loadState} from "root/client/src/components/LocalStorage";

export const AUTH_INIT = "AUTH_INIT";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export const login = () => {
  return {
    type: AUTH_INIT
  };
}

export const loginSuccess = (username) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    username
  };
}

export const loginFailure = () => {
  return {
    type: AUTH_LOGIN_FAILURE
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
    default:
      return loadState()['authentication'];
  }
}

export default Authentication;