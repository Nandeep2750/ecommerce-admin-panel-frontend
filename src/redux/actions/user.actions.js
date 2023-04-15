import { AUTH_TYPES } from "../../config/actionTypes";

function login(userAllData) {
  return (dispatch) => {
    let userData = userAllData;

    dispatch({
      type: AUTH_TYPES.LOGIN,
      payload: { userData: userData },
    });
  };
}

function updateProfile(userData) {
  return (dispatch) => {
    dispatch({
      type: AUTH_TYPES.EDIT,
      payload: { userData: userData }
    });
  };
}

function logout() {
  return (dispatch) => {
    dispatch({
      type: AUTH_TYPES.LOGOUT,
      payload: { userData: null },
    });
  };
}

export const userActions = {
  login,
  updateProfile,
  logout,
};
