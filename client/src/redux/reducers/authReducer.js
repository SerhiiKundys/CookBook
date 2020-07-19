import {
  AUTH_SET_SERVER_ERROR,
  AUTH_SET_AUTH_IN_PROCESS,
  AUTH_SET_USER_AUTH,
} from "../types/types";

const initialState = {
  login: null,
  id: null,
  token: null,
  isAuthenticated: false,
  serverError: null,
  authInProcess: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_SERVER_ERROR:
      return Object.assign({}, state, { serverError: action.serverError });
    case AUTH_SET_AUTH_IN_PROCESS:
      return Object.assign({}, state, { authInProcess: action.authInProcess });
    case AUTH_SET_USER_AUTH:
      return Object.assign({}, state, {
        login: action.userData.login,
        id: action.userData.id,
        isAuthenticated: true,
        token: action.userData.token,
      });
    default:
      return state;
  }
};
