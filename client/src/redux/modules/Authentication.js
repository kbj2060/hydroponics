import update from 'react-addons-update';

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

export const login = () => {
  return {
    type: AUTH_LOGIN
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
    case AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: 'WAITING' }
        }
      });
    case AUTH_LOGIN_SUCCESS:
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
      return update(state, {
        login: {
          status: { $set: 'FAILURE' }
        }
      });
    default:
      return state;
  }
}

export default Authentication;