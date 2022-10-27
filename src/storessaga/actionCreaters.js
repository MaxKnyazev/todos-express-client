import { SET_USER_TO_STORE, LOGOUT, ERROR_LOGIN, LOGIN, CONFIRM } from './actionTypes';

export const actionSetUserToStore = ({ isAuth, email, role, error, serverMessage }) => ({
  type: SET_USER_TO_STORE,
  payload: {
    email,
    role,
    serverMessage,
    error,
    isAuth,
  },
});

export const actionLogout = () => ({
  type: LOGOUT,
});

//только для работы саги... не использовать в редюсере
export const actionLoginAsync = (payload) => {
  console.log('=========================++++++++++++++++++')
  console.log(payload)
    return { 
      type: LOGIN, 
      payload,
    }
}
export const actionConfirmAsync = () => ({ type: CONFIRM });