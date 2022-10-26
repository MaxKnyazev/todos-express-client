import { SET_USER_TO_STORE, LOGOUT, ERROR_LOGIN } from './actionTypes';

const initialState = {
  role: 'user',
  email: '',
  serverMessage: '',
  error: '',
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TO_STORE:
      return {
        ...state, 
        email: action.payload.email,
        role: action.payload.role,
        serverMessage: action.payload.serverMessage,
        error: '',
        isAuth: action.payload.isAuth,
      }
    case LOGOUT :
      return {
        ...state,
        role: 'user',
        email: '',
        serverMessage: '',
        error: '',
        isAuth: false,
    }
    case ERROR_LOGIN :
      return {
        ...state,
        role: 'user',
        email: '',
        serverMessage: '',
        error: action?.payload?.error,
        isAuth: false,
    }
    default:
      return state
  }
}
