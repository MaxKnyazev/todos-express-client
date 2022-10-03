import { SET_USER } from './actionTypes';
import { axiosInstance } from '../utils/axiosInstance';

export const actionSetUser = ({ isAuth, email, role, serverMessage }) => ({
  type: SET_USER,
  payload: {
    isAuth,
    email,
    role,
    serverMessage,
  },
});

export const actionSetUserAsync = ({ email, password }) => {
  return async (dispatch) => {
    const setLogin = async () => {
      try {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password
        });

        return {
          isAuth: true,
          email: response.data.email,
          role: response.data.role,
          serverMessage: response.data,
        }
      } catch (error) {
        return {
          isAuth: false,
          email: '',
          role: '',
          serverMessage: error.response.data.error,
        }
      }
    }

    // setLogin()
    //   .then(({ email, role, serverMessage }) => {dispatch(actionSetUser({ email, role, serverMessage }))})
    //   .catch(e => console.log(e));

    // const { email, role, serverMessage } = await setLogin();
    // dispatch(actionSetUser({ email, role, serverMessage }));

    dispatch(actionSetUser({...await setLogin()}));
  }
}