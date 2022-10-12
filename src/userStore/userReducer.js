import { SET_USER, LOGOUT } from './actionTypes';

const initialState = {
  role: 'user',
  email: '',
  serverMessage: '',
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, 
        email: action.payload.email,
        role: action.payload.role,
        serverMessage: action.payload.serverMessage,
        isAuth: action.payload.isAuth,
      }
    case LOGOUT :
      return {
        ...state,
        role: 'user',
        email: '',
        serverMessage: '',
        isAuth: false,
      }
    default:
      return state
  }
}
