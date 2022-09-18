import { SET_USER } from './actionTypes';

const initialState = {
  role: 'user',
  email: '',
  serverMessage: '',
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state, 
        email: action.payload.email,
        role: action.payload.role,
        serverMessage: action.payload.serverMessage,
    }
    default:
      return state
  }
}
