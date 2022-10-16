import { SET_USER, LOGOUT } from './actionTypes';
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

export const actionLogout = () => ({
  type: LOGOUT,
});

export const actionSetUserAsync = ({ email, password }) => {
  return async (dispatch) => {
    
    const setLogin = async () => {
      try {
        const response = await axiosInstance.post('/auth/login', {
          email,
          password
        });

        localStorage.setItem('token', response.data.accessToken);
        // console.log('===================================== token:')
        // console.log(response.data.accessToken);

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
          serverMessage: error?.response?.data?.error,
        }
      }
    }

    // setLogin()
    //   .then(({ email, role, serverMessage }) => {dispatch(actionSetUser({ email, role, serverMessage }))})
    //   .catch(e => console.log(e));

    // const { email, role, serverMessage } = await setLogin();
    // dispatch(actionSetUser({ email, role, serverMessage }));

    dispatch(actionSetUser(await setLogin()));
  }
}

export const actionCurrentUserAsync = () => {
  return async (dispatch) => {

    const refreshUser = async () => {
      try {
        const response = await axiosInstance.get('/auth/currentUser', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });

        localStorage.setItem('token', response.data.accessToken);

        console.log('actionCurrentUserAsync-- try -------------------------------');
        console.log(response);

        return {
          isAuth: true,
          email: response.data.user.email,
          role: response.data.user.role,
          serverMessage: 'success',
        }
      } catch (error) {
        console.log('actionCurrentUserAsync-- catch -- ERROR ---------------------');
        console.log(error);
        return {
          isAuth: false,
          email: '',
          role: '',
          serverMessage: error?.response?.data?.error,
        }
      }
    }

    dispatch(actionSetUser(await refreshUser()));
  }
}